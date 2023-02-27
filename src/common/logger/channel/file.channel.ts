import { WriteStream, createWriteStream } from 'node:fs';
import { LogChannel } from "../log.channel";
import { LogLevel } from "@nestjs/common";

export class FileChannel implements LogChannel {
  private stream: WriteStream;
  constructor(
    private readonly pathProvider: string,
    private readonly logLevels?: LogLevel[]
  ) {
    this.stream = createWriteStream(path, { flags: 'a' });
  }

  async write(message: string, level: LogLevel) {
    if (this.logLevels && !this.logLevels.includes(level)) {
      return;
    }

    this.stream.write(message);
  }
}
