import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { NotFound } from '../common/errors/NotFound';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';

const albums = new Map<string, Album>();

@Injectable()
export class AlbumsService {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly tracksService: TracksService,
  ) {}

  artistRemoved(artistId: string) {
    albums.forEach((album) => {
      if (album.artistId == artistId) {
        album.artistId = null;
      }
    });
  }

  create(createAlbumDto: CreateAlbumDto) {
    const album = new Album(createAlbumDto);

    albums.set(album.id, album);

    return album;
  }

  findAll() {
    return [...albums.values()];
  }

  findOne(id: string) {
    if (!albums.has(id)) {
      throw new NotFound();
    }

    return albums.get(id);
  }

  findMany(ids: string[]) {
    return [...albums.values()].filter((a) => ids.includes(a.id));
  }

  exists(id: string) {
    return albums.has(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!albums.has(id)) {
      throw new NotFound();
    }

    albums.get(id).update(updateAlbumDto);

    return albums.get(id);
  }

  remove(id: string) {
    if (!albums.has(id)) {
      throw new NotFound();
    }

    albums.delete(id);

    this.favoritesService.albumRemoved(id);
    this.tracksService.albumRemoved(id);
  }
}
