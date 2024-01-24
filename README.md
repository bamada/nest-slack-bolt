<p align="center">
  <a href="https://github.com/bamada/nest-slack-bolt" target="blank"><img src="logo.svg" width="100" alt="Nestjs Slack Bolt" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A <a href="http://nestjs.com/" target="blank">Nestjs</a> module to interact seamlessly with <a href="https://api.slack.com/" target="_blank">Slack</a> API using the <a href="https://api.slack.com/bolt">Bolt</a> SDK.</p>

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)<!-- ALL-CONTRIBUTORS-BADGE:END -->

---
## Table of Contents
- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Setting Up](#setting-up)
- [Usage](#usage)
- [Examples](#examples)
    - [Using annotations](#using-annotations)
      - [Handling a message event](#handling-a-message-event)      
      - [Handling an action](#handling-an-action)
      - [Handling a command](#handling-a-command)
      - [Handling an event](#handling-an-event)
      - [Handling a shortcut event](#handling-a-shortcut-event)
    - [Using the SlackService](#using-the-slackservice)
- [To-Do List](#to-do-list)
- [Contribute & Disclaimer](#contribute--disclaimer)
- [Contributors](#contributors-)

--- 

## Description

This module gives a handy way to develop Slack applications using the Nestjs framework

## Features

The Nestjs Slack Bolt module offers the following features to simplify the interaction between your application and Slack API:

- Message Handling
- Command Handling
- Action Handling
- Event Handling
- Shortcut Handling

---
## Installation

The module can be installed using yarn or npm:

```bash
$ yarn add nestjs-slack-bolt
```

OR

```bash
$ npm i nestjs-slack-bolt
```

---

## Setting Up

Add these variables to the `.env` file to set up the module:

```bash
# To define on API mode
SLACK_SIGNING_SECRET="**"

# To define on Socket mode
SLACK_APP_TOKEN="**"

# Required variables
SLACK_BOT_TOKEN="**"
SLACK_SOCKET_MODE=true
```

---
## Usage

To use the module, import the `SlackModule`:

```typescript
import { Module } from '@nestjs/common';
import { SlackModule } from 'nestjs-slack-bolt';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [SlackModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

---

## Examples

Here are a few examples to demonstrate how you can use the Nestjs Slack Bolt module in your application:

### Using annotations
#### Handling a message event
```typescript
import { Controller } from '@nestjs/common';
import { Message } from 'nestjs-slack-bolt';
import { SlackEventMiddlewareArgs } from '@slack/bolt';

@Controller()
export class AppController {
  @Message('hi')
  message({ say }: SlackEventMiddlewareArgs) {
    say('Hello, I received your message!');
  }
  // Other handlers...
}
```

#### Handling an action
```typescript
import { Controller } from '@nestjs/common';
import { Action } from 'nestjs-slack-bolt';
import { SlackActionMiddlewareArgs } from '@slack/bolt';

@Controller()
export class AppController {
  @Action('click')
  action({ say }: SlackActionMiddlewareArgs) {
    say('Click event received, nice job!');
  }
  // Other handlers...
}
```
#### Handling a command
```typescript
import { Controller } from '@nestjs/common';
import { Command } from 'nestjs-slack-bolt';
import { SlackCommandMiddlewareArgs } from '@slack/bolt';

@Controller()
export class AppController {
  @Command('/list')
  command({ say }: SlackCommandMiddlewareArgs) {
    say('The /list command has been received. Processing...');
  }
  // Other handlers...
}
```
#### Handling an event
```typescript
import { Controller } from '@nestjs/common';
import { Event } from 'nestjs-slack-bolt';
import { SlackEventMiddlewareArgs } from '@slack/bolt';

@Controller()
export class AppController {
  @Event('app_home_opened')
  event({ say }: SlackEventMiddlewareArgs) {
    say('The app was just opened!');
  }
  // Other handlers...
}
```
#### Handling a shortcut event
```typescript
import { Controller } from '@nestjs/common';
import { Shortcut } from 'nestjs-slack-bolt';

@Controller()
export class AppController {
  @Shortcut('test_shortcut')
  async shortcut({ shortcut, ack, client, logger }) {
    try {
      await ack(); //Acknowledge shortcut request

      const result = await client.views.open({
        trigger_id: shortcut.trigger_id,
        view: { /* Your view parameters */ }
      });

      logger.info(result); // Log the result
    } 
    catch (error) {
      logger.error(error); // Log any error
    }
  }
  // Other handlers...
}
```
These examples demonstrate how to handle different types of interactions in your Slack application using the NestJS Slack Bolt module.

### Using the SlackService

```typescript
import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SlackService } from 'nestjs-slack-bolt/services/slack.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { from } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly slackService: SlackService,
    private readonly configService: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  cronJob() {
    this.searchUsers()
      .pipe()
      .subscribe((users) => {
        console.log(JSON.stringify(users));
      });
  }

  searchUsers(cursor?: string) {
    return from(
      this.slackService.client.users.list({
        token: this.configService.get('SLACK_BOT_TOKEN'),
        limit: 1,
        ...(cursor && { cursor }),
      }),
    );
  }
}
```

---

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/bamada"><img src="https://avatars.githubusercontent.com/u/7466570?v=4?s=100" width="100px;" alt="madcam"/><br /><sub><b>madcam</b></sub></a><br /><a href="https://github.com/bamada/nest-slack-bolt/commits?author=bamada" title="Tests">⚠️</a> <a href="https://github.com/bamada/nest-slack-bolt/commits?author=bamada" title="Code">💻</a> <a href="https://github.com/bamada/nest-slack-bolt/commits?author=bamada" title="Documentation">📖</a> <a href="https://github.com/bamada/nest-slack-bolt/issues?q=author%3Abamada" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nadirabbas"><img src="https://avatars.githubusercontent.com/u/38838675?v=4?s=100" width="100px;" alt="Nadir Abbas"/><br /><sub><b>Nadir Abbas</b></sub></a><br /><a href="https://github.com/bamada/nest-slack-bolt/commits?author=nadirabbas" title="Tests">⚠️</a> <a href="https://github.com/bamada/nest-slack-bolt/commits?author=nadirabbas" title="Documentation">📖</a> <a href="https://github.com/bamada/nest-slack-bolt/issues?q=author%3Anadirabbas" title="Bug reports">🐛</a> <a href="https://github.com/bamada/nest-slack-bolt/commits?author=nadirabbas" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
