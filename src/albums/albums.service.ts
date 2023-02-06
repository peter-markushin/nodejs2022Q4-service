import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { NotFound } from '../common/errors/NotFound';

@Injectable()
export class AlbumsService {
  private albums: Record<string, Album> = {};

  artistRemoved(artistId: string) {
    for (const albumId in this.albums) {
      if (this.albums[albumId].artistId === artistId) {
        this.albums[albumId].artistId = null;
      }
    }
  }

  create(createAlbumDto: CreateAlbumDto) {
    const album = new Album(createAlbumDto);

    this.albums[album.id] = album;

    return album;
  }

  findAll() {
    return Object.values(this.albums);
  }

  findOne(id: string) {
    if (!this.albums[id]) {
      throw new NotFound();
    }

    return this.albums[id];
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!this.albums[id]) {
      throw new NotFound();
    }

    this.albums[id].update(updateAlbumDto);

    return this.albums[id];
  }

  remove(id: string) {
    if (!this.albums[id]) {
      throw new NotFound();
    }

    delete this.albums[id];
  }
}
