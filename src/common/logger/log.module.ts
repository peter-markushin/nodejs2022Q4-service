import { DynamicModule, Module } from "@nestjs/common";
import { LogService } from "./log.service";
import { LogChannel } from "./log.channel";
import { LogRotateService } from "./log-rotate.service";

type LogOptions = {
  channels: LogChannel[],
  maxLogSize: string
}

@Module({})
export class LogModule {
  static register(options: LogOptions): DynamicModule {
    const logService = new LogService(options.channels);
    const logRotateService = new LogRotateService(options.maxLogSize);
    
    const logServiceProvider = {
      provide: LogService,
      useValue: logService
    };
    
    const logRotateServiceProvider = {
      provide: LogRotateService,
      useValue: logRotateService
    };

    return {
      module: LogModule,
      providers: [logServiceProvider, logRotateServiceProvider],
      exports: [logServiceProvider, logRotateServiceProvider]
    };
  }
}
