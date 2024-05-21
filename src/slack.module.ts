import {
  ConfigurableModuleBuilder,
  Module,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { ExplorerService } from './services/explorer.service';
import { SlackService } from './services/slack.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { App, AppOptions, LogLevel } from '@slack/bolt';
import { LoggerProxy } from './loggers/logger.proxy';
import { SlackModuleOptions } from './interfaces/modules/module.options';
import { SLACK, SLACK_MODULE_OPTIONS } from './tokens';

const { ConfigurableModuleClass: SlackModuleConfigurableModuleClass } =
  new ConfigurableModuleBuilder<SlackModuleOptions>({
    moduleName: 'SlackModule',
    optionsInjectionToken: SLACK_MODULE_OPTIONS,
  })
    .setClassMethodName('forRoot')
    .build();

const slackServiceFactory = {
  provide: 'CONNECTION',
  useFactory: (
    configService: ConfigService,
    loggerProxy: LoggerProxy,
    options: SlackModuleOptions,
  ) => {
    loggerProxy.setName(SLACK);
    const {
      token = configService.get<string>('SLACK_BOT_TOKEN'),
      signingSecret = configService.get<string>('SLACK_SIGNING_SECRET'),
      socketMode = !!configService.get<boolean>('SLACK_SOCKET_MODE'),
      appToken = configService.get<string>('SLACK_APP_TOKEN'),
      logLevel = LogLevel.DEBUG,
      ...rest
    } = options ?? {};

    const opts: AppOptions = {
      logger: loggerProxy,
      token,
      signingSecret,
      socketMode,
      appToken,
      logLevel,
      ...rest,
    };
    return new App(opts);
  },
  inject: [ConfigService, LoggerProxy, SLACK_MODULE_OPTIONS],
};

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ExplorerService, LoggerProxy, SlackService, slackServiceFactory],
  exports: [SlackService],
})
export class SlackModule
  extends SlackModuleConfigurableModuleClass
  implements OnApplicationBootstrap
{
  constructor(
    private readonly slackService: SlackService,
    private readonly explorerService: ExplorerService,
  ) {
    super();
  }

  static forRoot(options?: SlackModuleOptions) {
    return super.forRoot(options ?? {});
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
