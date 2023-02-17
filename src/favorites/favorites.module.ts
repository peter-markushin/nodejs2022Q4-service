import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Artist } from "../artists/entities/artist.entity";
import { Album } from "../albums/entities/album.entity";
import { Track } from "../tracks/entities/track.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Album, Track])],
  controllers: [FavoritesController],
  providers: [FavoritesService, AlbumsService, ArtistsService, TracksService],
})
export class FavoritesModule {}
