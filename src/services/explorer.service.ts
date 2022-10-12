import { Injectable, Type } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Module } from '@nestjs/core/injector/module';
import { ModulesContainer } from '@nestjs/core/injector/modules-container';
import {
  SLACK_ACTION_METADATA,
  SLACK_COMMAND_METADATA,
  SLACK_MESSAGE_METADATA,
} from 'src/decorators/constants';
import { IEventHandler } from 'src/interfaces/events/event-handler.interface';
import { IEvent } from 'src/interfaces/events/event.interface';
import { IMetadataBase } from 'src/interfaces/metadata/metadata.interface';

@Injectable()
export class ExplorerService {
  constructor(
    private readonly modulesContainer: ModulesContainer,
    private readonly reflector: Reflector,
  ) {}

  explore() {
    const modules = [...this.modulesContainer.values()];

    const messages = this.flatMap<IEventHandler<IEvent>>(modules, (instance) =>
      this.filterProvider(instance, SLACK_MESSAGE_METADATA),
    );

    const actions = this.flatMap<IEventHandler<IEvent>>(modules, (instance) =>
      this.filterProvider(instance, SLACK_ACTION_METADATA),
    );

    const commands = this.flatMap<IEventHandler<IEvent>>(modules, (instance) =>
      this.filterProvider(instance, SLACK_COMMAND_METADATA),
    );

    return { messages, actions, commands };
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
