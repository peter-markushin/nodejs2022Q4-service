import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { NotFound } from '../common/errors/NotFound';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';

const artists = new Map<string, Artist>();

@Injectable()
export class ArtistsService {
  constructor(
    private readonly albumService: AlbumsService,
    private readonly favoritesService: FavoritesService,
    private readonly tracksService: TracksService,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    const artist = new Artist(createArtistDto);

    artists.set(artist.id, artist);

    return artist;
  }

  findAll() {
    return [...artists.values()];
  }

  findOne(id: string) {
    if (!artists.has(id)) {
      throw new NotFound();
    }

    return artists.get(id);
  }

  findMany(ids: string[]) {
    return [...artists.values()].filter((a) => ids.includes(a.id));
  }

  exists(id: string) {
    return artists.has(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!artists.has(id)) {
      throw new NotFound();
    }

    artists.get(id).update(updateArtistDto);

    return artists.get(id);
  }

  remove(id: string) {
    if (!artists.has(id)) {
      throw new NotFound();
    }

    artists.delete(id);

    this.favoritesService.artistRemoved(id);
    this.albumService.artistRemoved(id);
    this.tracksService.artistRemoved(id);
  }
}
