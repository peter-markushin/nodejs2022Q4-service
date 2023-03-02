import { DynamicModule, Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogRotateService } from './log-rotate.service';
import { StdoutChannel } from './channel/stdout.channel';
import { FileChannel } from './channel/file.channel';
import { LoggerMiddleware } from './log.middleware';

type LogOptions = {
  logPath: string;
  maxLogSize: string;
};

@Module({})
export class LogModule {
  static register(options: LogOptions): DynamicModule {
    const logRotateService = new LogRotateService(options.maxLogSize);

    const logService = new LogService([
      new StdoutChannel(),
      new FileChannel(logRotateService.rotate(options.logPath + '/error.log'), [
        'error',
      ]),
      new FileChannel(logRotateService.rotate(options.logPath + '/app.log')),
    ]);

    const logServiceProvider = {
      provide: LogService,
      useValue: logService,
    };

    const logRotateServiceProvider = {
      provide: LogRotateService,
      useValue: logRotateService,
    };

    return {
      module: LogModule,
      providers: [
        logServiceProvider,
        logRotateServiceProvider,
        LoggerMiddleware,
      ],
      exports: [logServiceProvider, logRotateServiceProvider, LoggerMiddleware],
    };
  }
}
