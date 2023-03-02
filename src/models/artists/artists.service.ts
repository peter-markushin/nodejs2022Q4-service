import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { NotFound } from '../../common/errors/NotFound';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private repository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = new Artist(createArtistDto);

    return this.repository.save(artist);
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

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    let artist: Artist;

    try {
      artist = await this.findOne(id);
    } catch (e) {
      throw new NotFound();
    }

    artist.update(updateArtistDto);

    return this.repository.save(artist);
  }

  async remove(id: string) {
    const result = await this.repository.delete(id);

    if (result.affected < 1) {
      throw new NotFound();
    }
  }
}
