import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, AlbumsService, FavoritesService, TracksService],
})
export class ArtistsModule {}
