import { Injectable, Type } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Module } from '@nestjs/core/injector/module';
import { ModulesContainer } from '@nestjs/core/injector/modules-container';
import {
  SLACK_ACTION_METADATA,
  SLACK_COMMAND_METADATA,
  SLACK_EVENT_METADATA,
  SLACK_MESSAGE_METADATA,
  SLACK_SHORTCUT_METADATA,
  SLACK_VIEW_METADATA,
} from '../decorators/constants';
import { IEventHandler } from '../interfaces/events/event-handler.interface';
import { IMetadataBase } from '../interfaces/metadata/metadata.interface';

@Injectable()
export class ExplorerService {
  constructor(
    private readonly modulesContainer: ModulesContainer,
    private readonly reflector: Reflector,
  ) {}

  explore() {
    const modules = [...this.modulesContainer.values()];

    const messages = this.flatMap<IEventHandler>(modules, (instance) =>
      this.filterProvider(instance, SLACK_MESSAGE_METADATA),
    );

    const actions = this.flatMap<IEventHandler>(modules, (instance) =>
      this.filterProvider(instance, SLACK_ACTION_METADATA),
    );

    const commands = this.flatMap<IEventHandler>(modules, (instance) =>
      this.filterProvider(instance, SLACK_COMMAND_METADATA),
    );

    const events = this.flatMap<IEventHandler>(modules, (instance) =>
      this.filterProvider(instance, SLACK_EVENT_METADATA),
    );

    const shortcuts = this.flatMap<IEventHandler>(modules, (instance) =>
      this.filterProvider(instance, SLACK_SHORTCUT_METADATA),
    );

    const views = this.flatMap<IEventHandler>(modules, (instance) =>
      this.filterProvider(instance, SLACK_VIEW_METADATA),
    );

    return { messages, actions, commands, events, shortcuts, views };
  }

  flatMap<T>(
    modules: Module[],
    callback: (instance: InstanceWrapper) => Type<any> | undefined,
  ): Type<T>[] {
    const items = modules
      .map((module) => [...module.controllers.values()].map(callback))
      .reduce((a, b) => a.concat(b), []);
    return items.filter((element) => !!element) as Type<T>[];
  }

  filterProvider(
    wrapper: InstanceWrapper,
    metadataKey: string,
  ): Type<any> | undefined {
    const { instance } = wrapper;
    if (!instance) {
      return undefined;
    }
    return this.extractMetadata(instance, metadataKey);
  }

  extractMetadata(
    instance: Record<string, any>,
    metadataKey: string,
  ): Type<any> {
    if (!instance.constructor) {
      return;
    }
    const metadata = this.reflector.get<IMetadataBase[] | undefined, string>(
      metadataKey,
      instance.constructor,
    );
    return metadata ? (instance.constructor as Type<any>) : undefined;
  }
}
