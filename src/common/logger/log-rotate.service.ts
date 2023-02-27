import { stat, rename, unlink } from 'node:fs/promises';

const MAX_FILES = 5;

export class LogRotateService {
  private readonly maxSizeBytes;

  constructor(private readonly maxSize: string) {
    this.maxSizeBytes = this.parseSize(maxSize);
  }

  async rotate(path: string): Promise<string> {
    if (this.maxSizeBytes === 0) {
      return path;
    }

    const fileStat = await stat(path);

    if (fileStat.size < this.maxSizeBytes) {
      return path;
    }

    return this.renameFiles(path);
  }

  private parseSize(size: string): number {
    const number = parseInt(size, 10);
    const multiplier = size.split(/\d+/)[1].trim();

    switch (multiplier.toLowerCase()) {
      case 'kib':
      case 'kb': return number * 1024;
      case 'mib':
      case 'mb': return number * 1024 * 1024;
      case 'gib':
      case 'gb': return number * 1024 * 1024 * 1024;
      default: return 0;
    }
  }

  private async renameFiles(path: string): Promise<string> {
    for (let i = MAX_FILES; i > 0; i--) {
      try {
        await stat(`${path}.${i}`);
      } catch (e) {
        continue;
      }

      if (i === MAX_FILES) {
        await unlink(`${path}.${i}`);

        continue;
      }

      await rename(`${path}.${i}`, `${path}.${i + 1}`);
    }

    await rename(path, `${path}.1`);

    return path;
  }
}
