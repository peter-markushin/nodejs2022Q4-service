import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import { LogChannel } from './log.channel';

@Injectable()
export class LogService implements LoggerService {
  private logLevels: LogLevel[];

  constructor(private readonly logChannels: LogChannel[]) {}

  private async writeMessage(message: any, params: any[], level: LogLevel) {
    const logMessage = `[${Date.now()}] ${message} ${JSON.stringify(params)}\n`;

    return Promise.all(this.logChannels.map((c) => c.write(logMessage, level)));
  }

  setLogLevels(levels: LogLevel[]): any {
    this.logLevels = levels;
  }

  async debug(message: any, ...optionalParams: any[]): Promise<any> {
    if (!this.logLevels.includes('debug')) {
      return;
    }

    return this.writeMessage(message, optionalParams, 'debug');
  }

  async error(message: any, ...optionalParams: any[]): Promise<any> {
    if (!this.logLevels.includes('error')) {
      return;
    }

    return this.writeMessage(message, optionalParams, 'error');
  }

  async log(message: any, ...optionalParams: any[]): Promise<any> {
    if (!this.logLevels.includes('log')) {
      return;
    }

    return this.writeMessage(message, optionalParams, 'log');
  }

  async verbose(message: any, ...optionalParams: any[]): Promise<any> {
    if (!this.logLevels.includes('verbose')) {
      return;
    }

    return this.writeMessage(message, optionalParams, 'verbose');
  }

  async warn(message: any, ...optionalParams: any[]): Promise<any> {
    if (!this.logLevels.includes('warn')) {
      return;
    }

    return this.writeMessage(message, optionalParams, 'warn');
  }
}
