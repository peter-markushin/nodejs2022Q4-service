import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { IdDto } from '../common/dto/id.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrack(@Param() dto: IdDto) {
    try {
      this.favoritesService.addTrack(dto.id);
    } catch (e) {
      throw new HttpException(
        'Track does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return { message: 'Track added' };
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param() dto: IdDto) {
    try {
      this.favoritesService.deleteTrack(dto.id);
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbum(@Param() dto: IdDto) {
    try {
      this.favoritesService.addAlbum(dto.id);
    } catch (e) {
      throw new HttpException(
        'Album does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return { message: 'Album added' };
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param() dto: IdDto) {
    try {
      this.favoritesService.deleteAlbum(dto.id);
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtist(@Param() dto: IdDto) {
    try {
      this.favoritesService.addArtist(dto.id);
    } catch (e) {
      throw new HttpException(
        'Artist does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return { message: 'Artist added' };
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param() dto: IdDto) {
    try {
      this.favoritesService.deleteArtist(dto.id);
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
