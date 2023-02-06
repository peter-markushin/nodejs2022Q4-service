import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { NotFound } from '../common/errors/NotFound';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class ArtistsService {
  private artists: Record<string, Artist> = {};

  constructor(
    private readonly albumService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    const artist = new Artist(createArtistDto);

    this.artists[artist.id] = artist;

    return artist;
  }

  findAll() {
    return Object.values(this.artists);
  }

  findOne(id: string) {
    if (!this.artists[id]) {
      throw new NotFound();
    }

    return this.artists[id];
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!this.artists[id]) {
      throw new NotFound();
    }

    this.artists[id].update(updateArtistDto);

    return this.artists[id];
  }

  remove(id: string) {
    if (!this.artists[id]) {
      throw new NotFound();
    }

    delete this.artists[id];

    this.albumService.artistRemoved(id);
    this.tracksService.artistRemoved(id);
  }
}
