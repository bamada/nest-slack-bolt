import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ExplorerService } from './services/explorer.service';
import { SlackService } from './services/slack.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { App, AppOptions } from '@slack/bolt';
import { LoggerProxy } from './loggers/logger.proxy';

const SLACK = 'Slack';

const slackServiceFactory = {
  provide: 'CONNECTION',
  useFactory: (configService: ConfigService, loggerProxy: LoggerProxy) => {
    loggerProxy.setName(SLACK);

    const options: AppOptions = {
      logger: loggerProxy,
      token: configService.get('SLACK_BOT_TOKEN'),
      signingSecret: configService.get('SLACK_SIGNING_SECRET'),
      socketMode: !!configService.get<boolean>('SOCKET_MODE'),
      appToken: configService.get('APP_TOKEN'),
    };
    return new App(options);
  },
  inject: [ConfigService, LoggerProxy],
};

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ExplorerService, LoggerProxy, SlackService, slackServiceFactory],
  exports: [SlackService],
})
export class SlackModule implements OnApplicationBootstrap {
  constructor(
    private readonly slackService: SlackService,
    private readonly explorerService: ExplorerService,
  ) {}

  onApplicationBootstrap() {
    const { messages, actions, commands } = this.explorerService.explore();
    this.slackService.registerMessages(messages);
    this.slackService.registerActions(actions);
    this.slackService.registerCommands(commands);
    // TODO register other events handler
  }
}
