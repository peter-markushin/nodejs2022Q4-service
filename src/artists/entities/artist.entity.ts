import * as crypto from 'node:crypto';

export class Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;

  constructor(dto: Partial<Artist>) {
    Object.assign(this, dto);

    this.id = crypto.randomUUID();
  }

  update(dto: Partial<Artist>): void {
    Object.assign(this, dto);
  }
}
