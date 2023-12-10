import { Injectable, Logger } from '@nestjs/common';
import { LogLevel } from '@slack/bolt';

@Injectable()
export class LoggerProxy extends Logger {
  constructor(name: string) {
    super(name);
  }

  public info(...msgs: any[]): void {
    this.log(msgs);
  }

  setLevel() {
    this.localInstance.setLogLevels([
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

  public setName(name: string) {
    this.context = name;
  }
}
