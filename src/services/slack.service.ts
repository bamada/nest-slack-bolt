import { Inject, Injectable, Logger, OnModuleInit, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { App } from '@slack/bolt';
import {
  SLACK_ACTION_METADATA,
  SLACK_COMMAND_METADATA,
  SLACK_EVENT_METADATA,
  SLACK_MESSAGE_METADATA,
  SLACK_SHORTCUT_METADATA,
} from '../decorators/constants';
import { InvalidEventException } from '../exceptions/invalid-event.exception';
import { IMetadataBase } from '../interfaces/metadata/metadata.interface';

const MESSAGE = 'Message';
const COMMAND = 'Command';
const SHORTCUT = 'Shortcut';
const ACTION = 'Action';
const EVENT = 'Event';

@Injectable()
export class SlackService implements OnModuleInit {
  private readonly _logger = new Logger(SlackService.name);

  constructor(
    private readonly moduleRef: ModuleRef,
    @Inject('CONNECTION')
    private readonly app: App,
  ) {}

  onModuleInit() {
    this.app.start();
  }
  registerMessages(messages: Type<unknown>[]) {
    this.register(
      messages,
      SLACK_MESSAGE_METADATA,
      MESSAGE,
      (pattern, callback) => this.app.message(pattern, callback),
    );
  }

  registerCommands(commands: Type<unknown>[]) {
    this.register(
      commands,
      SLACK_COMMAND_METADATA,
      COMMAND,
      (pattern, callback) => this.app.command(pattern, callback),
    );
  }

  registerShortcuts(shortcuts: Type<unknown>[]) {
    this.register(
      shortcuts,
      SLACK_SHORTCUT_METADATA,
      SHORTCUT,
      (pattern, callback) => this.app.shortcut(pattern, callback),
    );
  }

  registerEvents(events: Type<unknown>[]) {
    this.register<IMetadataBase<string>, string>(
      events,
      SLACK_EVENT_METADATA,
      EVENT,
      (pattern, callback) => this.app.event(pattern, callback),
    );
  }

  registerActions(actions: Type<unknown>[]) {
    this.register(actions, SLACK_ACTION_METADATA, ACTION, (pattern, callback) =>
      this.app.action(pattern, callback),
    );
  }

  register<
    T extends IMetadataBase,
    K extends string | RegExp = string | RegExp,
  >(
    types: Type<unknown>[],
    metadataKey: string,
    eventType: string,
    callback: (pattern: K, fn: () => Promise<void>) => void,
  ): void {
    const eventHandlers = types
      .map((target) => {
        const metadata = Reflect.getMetadata(metadataKey, target) || [];
        const instance = this.moduleRef.get(target, { strict: false });
        if (!instance) {
          throw new InvalidEventException();
        }

        return metadata.map((data: T) => ({
          pattern: data.pattern,
          fn: instance[data.propertyKey].bind(instance),
        }));
      })
      .reduce((a, b) => [...a, ...b], []);

    eventHandlers.forEach((event: { pattern: K; fn: () => Promise<void> }) => {
      callback(event.pattern, event.fn);
      this._logger.log(`Mapped {'${event.pattern}', ${eventType}} event`);
    });
  }
}
