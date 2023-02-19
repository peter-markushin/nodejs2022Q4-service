import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { NotFound } from '../common/errors/NotFound';
import { In, Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private repository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = new Album(createAlbumDto);

    return this.repository.save(album);
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    return this.repository.findOneByOrFail({ id });
  }

  async findMany(ids: string[]) {
    return this.repository.findBy({ id: In(ids) });
  }

  async exists(id: string) {
    return this.repository.exist({ where: { id } });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    let album: Album;

    try {
      album = await this.repository.findOneByOrFail({ id });
    } catch (e) {
      throw new NotFound();
    }

    album.update(updateAlbumDto);

    return this.repository.save(album);
  }

  async remove(id: string) {
    const result = await this.repository.delete(id);

    if (result.affected < 1) {
      throw new NotFound();
    }
  }
}
