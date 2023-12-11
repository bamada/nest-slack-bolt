import { Injectable, Logger } from '@nestjs/common';
import { LogLevel as NestLogLevel } from '@nestjs/common';
import { LogLevel as SlackLogLevel } from '@slack/bolt';

@Injectable()
export class LoggerProxy extends Logger {
  level: NestLogLevel = 'log';

  constructor(name: string) {
    super(name);
  }

  public info(...msgs: any[]): void {
    this.log(msgs);
  }

  public setLevel(level: SlackLogLevel) {
    if (level !== SlackLogLevel.INFO) {
      this.level = level as NestLogLevel;
    }

    if (this.localInstance.setLogLevels) {
      this.localInstance.setLogLevels([this.level]);
    } else {
      this.localInstance.warn(
        'setLogLevels is not available on the Logger instance.',
      );
    }
  }

  getLevel(): SlackLogLevel {
    if (this.level !== 'log') {
      return SlackLogLevel.INFO;
    }
    return this.level as SlackLogLevel;
  }

  public setName(name: string) {
    this.context = name;
  }
}
