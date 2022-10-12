import { Injectable, Logger } from '@nestjs/common';
import { LogLevel } from '@slack/bolt';

@Injectable()
export class LoggerProxy extends Logger {
  constructor(name: string) {
    super(name);
  }

  info(...msg: any[]) {
    this.log(msg);
  }

  setLevel(level: LogLevel) {
    super.localInstance.setLogLevels([
      'log',
      'error',
      'debug',
      'verbose',
      'warn',
    ]);
  }

  getLevel(): LogLevel {
    return LogLevel.INFO;
  }

  setName(name: string) {
    super.context = name;
  }
}
