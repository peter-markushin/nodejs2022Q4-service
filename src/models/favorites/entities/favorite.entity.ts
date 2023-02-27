import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  AfterLoad,
} from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';
import { Track } from '../../tracks/entities/track.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @ManyToMany(() => Artist, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinTable()
  artists: Artist[];

  @ManyToMany(() => Album, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinTable()
  albums: Album[];

  @ManyToMany(() => Track, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinTable()
  tracks: Track[];

  static create(): Favorite {
    const fav = new Favorite();

    fav.initArrays();

    return fav;
  }

  @AfterLoad()
  initArrays() {
    if (this.artists === undefined) {
      this.artists = [];
    }

    if (this.albums === undefined) {
      this.albums = [];
    }

    if (this.tracks === undefined) {
      this.tracks = [];
    }
  }

  addArtist(artist: Artist) {
    if (this.artists === undefined) {
      this.artists = [];
    }

    if (!this.hasArtist(artist.id)) {
      this.artists.push(artist);
    }
  }

  removeArtist(id: string): boolean {
    if (this.artists === undefined) {
      return false;
    }

    const albumIdx = this.artists.findIndex((album) => album.id === id);

    if (albumIdx === -1) {
      return false;
    }

    this.artists.splice(albumIdx, 1);

    return true;
  }

  private hasArtist(id: string): boolean {
    if (!this.artists) {
      return false;
    }

    return this.artists.find((artist) => artist.id === id) !== undefined;
  }

  addAlbum(album: Album) {
    if (this.albums === undefined) {
      this.albums = [];
    }

    if (!this.hasAlbum(album.id)) {
      this.albums.push(album);
    }
  }

  removeAlbum(id: string): boolean {
    if (this.albums === undefined) {
      return false;
    }

    const albumIdx = this.albums.findIndex((album) => album.id === id);

    if (albumIdx === -1) {
      return false;
    }

    this.albums.splice(albumIdx, 1);

    return true;
  }

  private hasAlbum(id: string): boolean {
    if (!this.albums) {
      return false;
    }

    return this.albums.find((album) => album.id === id) !== undefined;
  }

  addTrack(track: Track) {
    if (this.tracks === undefined) {
      this.tracks = [];
    }

    if (!this.hasTrack(track.id)) {
      this.tracks.push(track);
    }
  }

  removeTrack(id: string): boolean {
    if (this.tracks === undefined) {
      return false;
    }

    const trackIdx = this.tracks.findIndex((track) => track.id === id);

    if (trackIdx === -1) {
      return false;
    }

    this.tracks.splice(trackIdx, 1);

    return true;
  }

  private hasTrack(id: string): boolean {
    if (!this.tracks) {
      return false;
    }

    return this.tracks.find((track) => track.id === id) !== undefined;
  }
}
