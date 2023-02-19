import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { FavoritesService } from '../favorites/favorites.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, AlbumsService, ArtistsService, FavoritesService],
})
export class TracksModule {}
