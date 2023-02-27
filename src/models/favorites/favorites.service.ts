import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { NotFound } from '../../common/errors/NotFound';
import { Favorite } from './entities/favorite.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly repository: Repository<Favorite>,

    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
  ) {}

  private async getOrCreateDefaultFavorites() {
    try {
      return await this.repository.findOneOrFail({
        where: {
          id: Not(IsNull()),
        },
        relations: {
          artists: true,
          albums: true,
          tracks: true,
        },
      });
    } catch (e) {
      return Favorite.create();
    }
  }

  async findAll() {
    return this.getOrCreateDefaultFavorites();
  }

  async addAlbum(id: string) {
    const album = await this.albumsService.findOne(id);
    const favorites = await this.getOrCreateDefaultFavorites();

    favorites.addAlbum(album);
    await this.repository.save(favorites);
  }

  async deleteAlbum(id: string) {
    const favorites = await this.getOrCreateDefaultFavorites();

    if (!favorites.removeAlbum(id)) {
      throw new NotFound();
    }

    await this.repository.save(favorites);
  }

  async addArtist(id: string) {
    const artist = await this.artistsService.findOne(id);
    const favorites = await this.getOrCreateDefaultFavorites();

    favorites.addArtist(artist);

    await this.repository.save(favorites);
  }

  async deleteArtist(id: string) {
    const favorites = await this.getOrCreateDefaultFavorites();

    if (!favorites.removeArtist(id)) {
      throw new NotFound();
    }

    await this.repository.save(favorites);
  }

  async addTrack(id: string) {
    const track = await this.tracksService.findOne(id);
    const favorites = await this.getOrCreateDefaultFavorites();

    favorites.addTrack(track);

    await this.repository.save(favorites);
  }

  async deleteTrack(id: string) {
    const favorites = await this.getOrCreateDefaultFavorites();

    if (!favorites.removeTrack(id)) {
      throw new NotFound();
    }

    await this.repository.save(favorites);
  }
}
