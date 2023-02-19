import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { NotFound } from '../common/errors/NotFound';

const tracks: string[] = [];
const albums: string[] = [];
const artists: string[] = [];

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
  ) {}

  albumRemoved(albumId: string) {
    if (!albums.includes(albumId)) {
      return;
    }

    delete albums[albums.indexOf(albumId)];
  }

  artistRemoved(artistId: string) {
    if (!artists.includes(artistId)) {
      return;
    }

    delete artists[artists.indexOf(artistId)];
  }

  trackRemoved(trackId: string) {
    if (!tracks.includes(trackId)) {
      return;
    }

    delete tracks[tracks.indexOf(trackId)];
  }

  findAll() {
    return {
      artists: this.artistsService.findMany(artists),
      albums: this.albumsService.findMany(albums),
      tracks: this.tracksService.findMany(tracks),
    };
  }

  addAlbum(id: string) {
    if (!this.albumsService.exists(id)) {
      throw new NotFound();
    }

    if (albums.includes(id)) {
      return;
    }

    albums.push(id);
  }

  deleteAlbum(id: string) {
    if (!albums.includes(id)) {
      throw new NotFound();
    }

    delete albums[albums.indexOf(id)];
  }

  addArtist(id: string) {
    if (!this.artistsService.exists(id)) {
      throw new NotFound();
    }

    if (artists.includes(id)) {
      return;
    }

    artists.push(id);
  }

  deleteArtist(id: string) {
    if (!artists.includes(id)) {
      throw new NotFound();
    }

    delete artists[artists.indexOf(id)];
  }

  addTrack(id: string) {
    if (!this.tracksService.exists(id)) {
      throw new NotFound();
    }

    if (tracks.includes(id)) {
      return;
    }

    tracks.push(id);
  }

  deleteTrack(id: string) {
    if (!tracks.includes(id)) {
      throw new NotFound();
    }

    delete tracks[tracks.indexOf(id)];
  }
}
