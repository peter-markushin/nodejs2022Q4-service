import * as crypto from 'node:crypto';

export class Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist

  constructor(dto: Partial<Omit<Album, 'id'>>) {
    Object.assign(this, dto);

    this.id = crypto.randomUUID();
  }

  public update(dto: Partial<Omit<Album, 'id'>>) {
    Object.assign(this, dto);
  }
}
