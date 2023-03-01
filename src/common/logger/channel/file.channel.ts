import { appendFileSync } from 'node:fs';
import { LogChannel } from "../log.channel";
import { LogLevel } from "@nestjs/common";

export class FileChannel implements LogChannel {
  constructor(
    private readonly path: string,
    private readonly logLevels?: LogLevel[]
  ) {
  }

  async write(message: string, level: LogLevel) {
    if (this.logLevels && !this.logLevels.includes(level)) {
      return;
    }

    appendFileSync(this.path, message);
  }
}
