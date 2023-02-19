import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
  Put,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IdDto } from '../common/dto/id.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param() dto: IdDto) {
    try {
      return this.albumsService.findOne(dto.id);
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  update(@Param() dto: IdDto, @Body() updateAlbumDto: UpdateAlbumDto) {
    try {
      return this.albumsService.update(dto.id, updateAlbumDto);
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() dto: IdDto) {
    try {
      return this.albumsService.remove(dto.id);
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
