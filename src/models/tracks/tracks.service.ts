import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { NotFound } from '../../common/errors/NotFound';
import { In, Repository } from 'typeorm';

@Injectable({ scope: Scope.DEFAULT })
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly repository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = new Track(createTrackDto);

    return this.repository.save(track);
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

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    let track: Track;

    try {
      track = await this.repository.findOneByOrFail({ id });
    } catch (e) {
      throw new NotFound();
    }

    track.update(updateTrackDto);

    return this.repository.save(track);
  }

  async remove(id: string) {
    const result = await this.repository.delete(id);

    if (result.affected < 1) {
      throw new NotFound();
    }
  }
}
