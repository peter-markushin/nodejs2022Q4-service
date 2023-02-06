import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { NotFound } from '../common/errors/NotFound';
import { TracksService } from '../tracks/tracks.service';

const albums = new Map<string, Album>();

@Injectable()
export class AlbumsService {
  constructor(private readonly tracksService: TracksService) {}

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

    this.tracksService.albumRemoved(id);
  }
}
