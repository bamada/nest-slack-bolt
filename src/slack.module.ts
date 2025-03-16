import {
  DynamicModule,
  Module,
  OnApplicationBootstrap,
  Provider,
  Type,
  ForwardReference,
} from '@nestjs/common';
import { ExplorerService } from './services/explorer.service';
import { SlackService } from './services/slack.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { App, AppOptions, LogLevel } from '@slack/bolt';
import { LoggerProxy } from './loggers/logger.proxy';
import { SlackModuleOptions } from './interfaces/modules/module.options';
import { SLACK, SLACK_MODULE_OPTIONS } from './tokens';

export interface SlackModuleAsyncOptions {
  imports?: Array<
    Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
  useFactory?: (
    ...args: any[]
  ) => Promise<SlackModuleOptions> | SlackModuleOptions;
  useClass?: Type<SlackModuleOptionsFactory>;
  useExisting?: Type<SlackModuleOptionsFactory>;
  useValue?: SlackModuleOptions;
  inject?: any[];
}

export interface SlackModuleOptionsFactory {
  createSlackOptions(): Promise<SlackModuleOptions> | SlackModuleOptions;
}

const createSlackConnection = {
  provide: 'CONNECTION',
  useFactory: (
    configService: ConfigService,
    loggerProxy: LoggerProxy,
    options: SlackModuleOptions,
  ) => {
    const logLevel = options.logLevel ?? LogLevel.INFO;
    loggerProxy.setName(SLACK);
    loggerProxy.setLevel(logLevel);
    const {
      token = configService.get<string>('SLACK_BOT_TOKEN'),
      signingSecret = configService.get<string>('SLACK_SIGNING_SECRET'),
      socketMode = !!configService.get<boolean>('SLACK_SOCKET_MODE'),
      appToken = configService.get<string>('SLACK_APP_TOKEN'),
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
  providers: [ExplorerService, LoggerProxy, SlackService],
  exports: [SlackService],
})
export class SlackModule implements OnApplicationBootstrap {
  constructor(
    private readonly slackService: SlackService,
    private readonly explorerService: ExplorerService,
  ) {}

  static forRoot(options?: SlackModuleOptions): DynamicModule {
    return {
      module: SlackModule,
      imports: [ConfigModule.forRoot()],
      providers: [
        {
          provide: SLACK_MODULE_OPTIONS,
          useValue: options ?? {},
        },
        ExplorerService,
        LoggerProxy,
        SlackService,
        createSlackConnection,
      ],
      exports: [SlackService],
    };
  }

  static forRootAsync(options: SlackModuleAsyncOptions): DynamicModule {
    return {
      module: SlackModule,
      imports: [...(options.imports || []), ConfigModule.forRoot()],
      providers: [
        ...this.createAsyncProviders(options),
        ExplorerService,
        LoggerProxy,
        SlackService,
        createSlackConnection,
      ],
      exports: [SlackService],
    };
  }

  /**
   * Create providers based on the async options
   * @param options The async module options
   * @returns An array of providers
   */
  private static createAsyncProviders(
    options: SlackModuleAsyncOptions,
  ): Provider[] {
    if (options.useValue) {
      return [
        {
          provide: SLACK_MODULE_OPTIONS,
          useValue: options.useValue,
        },
      ];
    }

    if (options.useFactory) {
      return [
        {
          provide: SLACK_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ];
    }

    if (options.useClass) {
      return [
        {
          provide: options.useClass,
          useClass: options.useClass,
        },
        {
          provide: SLACK_MODULE_OPTIONS,
          useFactory: async (optionsFactory: SlackModuleOptionsFactory) =>
            optionsFactory.createSlackOptions(),
          inject: [options.useClass],
        },
      ];
    }

    if (options.useExisting) {
      return [
        {
          provide: SLACK_MODULE_OPTIONS,
          useFactory: async (optionsFactory: SlackModuleOptionsFactory) =>
            optionsFactory.createSlackOptions(),
          inject: [options.useExisting],
        },
      ];
    }

    throw new Error(
      'Invalid SlackModuleAsyncOptions configuration. Provide useValue, useFactory, useClass, or useExisting.',
    );
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
