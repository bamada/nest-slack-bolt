import { DynamicModule, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ExplorerService } from './services/explorer.service';
import { SlackService } from './services/slack.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { App, AppOptions, LogLevel } from '@slack/bolt';
import { LoggerProxy } from './loggers/logger.proxy';
import { SlackModuleOptions } from './interfaces/modules/module.options';

const SLACK = 'Slack';
const SLACK_MODULE_OPTIONS = 'SLACK_MODULE_OPTIONS';

const slackServiceFactory = {
  provide: 'CONNECTION',
  useFactory: (
    configService: ConfigService,
    loggerProxy: LoggerProxy,
    options: SlackModuleOptions,
  ) => {
    loggerProxy.setName(SLACK);
    const opts: AppOptions = {
      logger: loggerProxy,
      token: configService.get('SLACK_BOT_TOKEN'),
      signingSecret: configService.get('SLACK_SIGNING_SECRET'),
      socketMode: !!configService.get<boolean>('SLACK_SOCKET_MODE'),
      appToken: configService.get('SLACK_APP_TOKEN'),
      logLevel: options.logLevel ?? LogLevel.DEBUG,
      ...options,
    };
    return new App(opts);
  },
  inject: [ConfigService, LoggerProxy, SLACK_MODULE_OPTIONS],
};

@Module({})
export class SlackModule implements OnApplicationBootstrap {
  constructor(
    private readonly slackService: SlackService,
    private readonly explorerService: ExplorerService,
  ) {}

  static forRoot(options: SlackModuleOptions = {}): DynamicModule {
    return {
      module: SlackModule,
      imports: [ConfigModule.forRoot()],
      providers: [
        {
          provide: SLACK_MODULE_OPTIONS,
          useValue: options,
        },
        ExplorerService,
        LoggerProxy,
        SlackService,
        slackServiceFactory,
      ],
      exports: [SlackService],
    };
  }

  onApplicationBootstrap() {
    const { messages, actions, commands, events, shortcuts, views } =
      this.explorerService.explore();

    this.slackService.registerMessages(messages);
    this.slackService.registerActions(actions);
    this.slackService.registerCommands(commands);
    this.slackService.registerEvents(events);
    this.slackService.registerShortcuts(shortcuts);
    this.slackService.registerViews(views);
    // TODO register other events handler
  }
}
