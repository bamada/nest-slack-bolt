<p align="center">
  <a href="https://github.com/bamada/nest-slack-bolt" target="blank"><img src="logo.svg" width="100" alt="Nestjs Slack Bolt" /></a>
</p>

<p align="center">A <a href="http://nestjs.com/" target="blank">Nestjs</a> module to interact seamlessly with <a href="https://api.slack.com/" target="_blank">Slack</a> API using the <a href="https://api.slack.com/bolt">Bolt</a> SDK.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/nestjs-slack-bolt" target="_blank"><img src="https://img.shields.io/npm/v/nestjs-slack-bolt.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/nestjs-slack-bolt" target="_blank"><img src="https://img.shields.io/npm/l/nestjs-slack-bolt.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/package/nestjs-slack-bolt" target="_blank"><img src="https://img.shields.io/npm/dm/nestjs-slack-bolt.svg" alt="NPM Downloads" /></a>
  <a href="https://github.com/bamada/nest-slack-bolt/actions"><img src="https://github.com/bamada/nest-slack-bolt/workflows/CI/badge.svg" alt="CI Status" /></a>
  <a href="https://github.com/bamada/nest-slack-bolt#contributors-"><img src="https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square" alt="All Contributors" /></a>
  <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" alt="code style: prettier" /></a>
</p>

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Using annotations](#using-annotations)
    - [Handling a message event](#handling-a-message-event)
    - [Handling an action](#handling-an-action)
    - [Handling a command](#handling-a-command)
    - [Handling an event](#handling-an-event)
    - [Handling a shortcut event](#handling-a-shortcut-event)
  - [Using the SlackService](#using-the-slackservice)
- [Troubleshooting](#troubleshooting)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)
- [Contributors](#contributors-)

## Description

This module provides a convenient way to develop Slack applications using the Nestjs framework. It seamlessly integrates the Slack Bolt SDK with NestJS, allowing you to leverage the power of both platforms.

## Features

- **Message Handling**: Easily respond to and process incoming Slack messages.
- **Command Handling**: Implement custom Slack commands for your application.
- **Action Handling**: React to user interactions with buttons, select menus, and other Slack UI elements.
- **Event Handling**: Listen and respond to various Slack events in real-time.
- **Shortcut Handling**: Create and manage global and message shortcuts.
- **View Submissions**: Process and respond to modal view submissions.
- **Seamless NestJS Integration**: Utilize NestJS dependency injection and module system with Slack Bolt.
- **Decorators for Easy Setup**: Use custom decorators to quickly set up event listeners.

## Installation

```bash
$ npm install nestjs-slack-bolt
# or
$ yarn add nestjs-slack-bolt
```

## Quick Start

1. Install the package
2. Set up environment variables (see Configuration)
3. Import SlackModule in your app.module.ts:

```typescript
import { Module } from '@nestjs/common';
import { SlackModule } from 'nestjs-slack-bolt';

@Module({
  imports: [SlackModule.forRoot()],
})
export class AppModule {}
```

4. Use decorators in your controllers to handle Slack events

## Configuration

Add these variables to your `.env` file:

```bash
# Required for all modes
SLACK_BOT_TOKEN="xoxb-your-bot-token"

# Required for socket mode
SLACK_APP_TOKEN="xapp-your-app-token"
SLACK_SOCKET_MODE=true

# Required for HTTP mode
SLACK_SIGNING_SECRET="your-signing-secret"
```

You can also pass options to `SlackModule.forRoot()`:

```typescript
SlackModule.forRoot({
  logLevel: LogLevel.DEBUG,
  // other Bolt app options
});
```

## Usage

### Using annotations

#### Handling a message event

```typescript
import { Controller } from '@nestjs/common';
import { Message } from 'nestjs-slack-bolt';
import { SlackEventMiddlewareArgs } from '@slack/bolt';

@Controller()
export class AppController {
  @Message('hi')
  message({ say }: SlackEventMiddlewareArgs<'message'>) {
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
  event({ say }: SlackEventMiddlewareArgs<'app_home_opened'>) {
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
        view: {
          /* Your view parameters */
        },
      });

      logger.info(result); // Log the result
    } catch (error) {
      logger.error(error); // Log any error
    }
  }
  // Other handlers...
}
```

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

## Troubleshooting

Here are some common issues and their solutions:

1. "**Cannot find module 'nestjs-slack-bolt'**": Ensure you've installed the package correctly.
2. "**Invalid token**": Double-check your SLACK_BOT_TOKEN in the .env file.
3. **Socket mode not working**: Verify that SLACK_APP_TOKEN is set and SLACK_SOCKET_MODE is true.

For more issues, please check our GitHub issues or open a new one.

## Changelog

See CHANGELOG.md for details on recent changes.

## Contributing

We welcome contributions! Please see our CONTRIBUTING.md for details on how to contribute.

## Support

For support, please open an issue on our GitHub repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

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
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ognjenco"><img src="https://avatars.githubusercontent.com/u/8527400?v=4?s=100" width="100px;" alt="ognjenco"/><br /><sub><b>ognjenco</b></sub></a><br /><a href="https://github.com/bamada/nest-slack-bolt/issues?q=author%3Aognjenco" title="Bug reports">🐛</a> <a href="https://github.com/bamada/nest-slack-bolt/commits?author=ognjenco" title="Code">💻</a> <a href="https://github.com/bamada/nest-slack-bolt/commits?author=ognjenco" title="Documentation">📖</a> <a href="https://github.com/bamada/nest-slack-bolt/commits?author=ognjenco" title="Tests">⚠️</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification.
