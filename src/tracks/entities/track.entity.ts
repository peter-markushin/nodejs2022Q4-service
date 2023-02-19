import * as crypto from 'node:crypto';

export class Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number

  constructor(dto: Partial<Omit<Track, 'id'>>) {
    Object.assign(this, dto);

    this.id = crypto.randomUUID();
  }

  update(dto: Partial<Omit<Track, 'id'>>) {
    Object.assign(this, dto);
  }
}
