import { Injectable, Scope } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { NotFound } from '../common/errors/NotFound';
import { FavoritesService } from '../favorites/favorites.service';

const tracks = new Map<string, Track>();

@Injectable({ scope: Scope.DEFAULT })
export class TracksService {
  constructor(private readonly favoritesService: FavoritesService) {}
  artistRemoved(artistId: string) {
    tracks.forEach((track) => {
      if (track.artistId == artistId) {
        track.artistId = null;
      }
    });
  }

  albumRemoved(albumId: string) {
    tracks.forEach((track) => {
      if (track.albumId == albumId) {
        track.albumId = null;
      }
    });
  }

  create(createTrackDto: CreateTrackDto) {
    const track = new Track(createTrackDto);

    tracks.set(track.id, track);

    return track;
  }

  findAll() {
    return [...tracks.values()];
  }

  findOne(id: string) {
    if (!tracks.has(id)) {
      throw new NotFound();
    }

    return tracks.get(id);
  }

  findMany(ids: string[]) {
    return [...tracks.values()].filter((t) => ids.includes(t.id));
  }

  exists(id: string) {
    return tracks.has(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!tracks.has(id)) {
      throw new NotFound();
    }

    const track = tracks.get(id);

    track.update(updateTrackDto);

    return track;
  }

  remove(id: string) {
    if (!tracks.has(id)) {
      throw new NotFound();
    }

    tracks.delete(id);

    this.favoritesService.trackRemoved(id);
  }
}
