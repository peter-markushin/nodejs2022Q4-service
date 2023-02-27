import { stdout } from 'node:process';
import { LogChannel } from "../log.channel";
import { LogLevel } from "@nestjs/common";

export class StdoutChannel implements LogChannel {
  async write(message: string, _: LogLevel) {
    stdout.write(message);
  }
}
