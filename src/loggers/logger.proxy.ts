import { Injectable, Logger } from '@nestjs/common';
import { LogLevel as NestLogLevel } from '@nestjs/common';
import { LogLevel as SlackLogLevel } from '@slack/bolt';

@Injectable()
export class LoggerProxy extends Logger {
  level: NestLogLevel = 'log';

  constructor(name: string) {
    super(name);
  }

  /**
   * Logs information messages
   * @param msgs Array of messages to log
   */
  public info(...msgs: any[]): void {
    this.log(msgs);
  }

  /**
   * Sets the log level for the logger
   * @param level The log level to set (from SlackLogLevel enum)
   */
  public setLevel(level: SlackLogLevel): void {
    this.level = this.convertSlackToNestLogLevel(level);

    if (this.localInstance && this.localInstance?.setLogLevels) {
      this.localInstance.setLogLevels([this.level]);
    } else {
      this.warn('setLogLevels is not available on the Logger instance.');
    }
  }

  /**
   * Gets the current log level
   * @returns The current log level (from SlackLogLevel enum)
   */
  getLevel(): SlackLogLevel {
    return this.convertNestToSlackLogLevel(this.level);
  }

  /**
   * Sets the name (context) for the logger
   * @param name The new name for the logger
   */
  public setName(name: string) {
    this.context = name;
  }

  /**
   * Converts a SlackLogLevel to a NestLogLevel
   * @param level The SlackLogLevel to convert
   * @returns The equivalent NestLogLevel
   */
  private convertSlackToNestLogLevel(level: SlackLogLevel): NestLogLevel {
    switch (level) {
      case SlackLogLevel.DEBUG:
        return 'debug';
      case SlackLogLevel.INFO:
        return 'log';
      case SlackLogLevel.WARN:
        return 'warn';
      case SlackLogLevel.ERROR:
        return 'error';
      default:
        return 'log';
    }
  }

  /**
   * Converts a NestLogLevel to a SlackLogLevel
   * @param level The NestLogLevel to convert
   * @returns The equivalent SlackLogLevel
   */
  private convertNestToSlackLogLevel(level: NestLogLevel): SlackLogLevel {
    switch (level) {
      case 'debug':
        return SlackLogLevel.DEBUG;
      case 'log':
        return SlackLogLevel.INFO;
      case 'warn':
        return SlackLogLevel.WARN;
      case 'error':
        return SlackLogLevel.ERROR;
      default:
        return SlackLogLevel.INFO;
    }
  }
}
