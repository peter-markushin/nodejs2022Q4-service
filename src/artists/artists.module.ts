import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { AlbumsService } from '../albums/albums.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, AlbumsService],
})
export class ArtistsModule {}
