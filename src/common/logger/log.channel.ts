import { LogLevel } from '@nestjs/common';

export interface LogChannel {
  write(message: string, level: LogLevel): Promise<void>;
}
