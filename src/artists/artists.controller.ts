import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IdDto } from '../common/dto/id.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param() dto: IdDto) {
    try {
      return this.artistsService.findOne(dto.id);
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  update(@Param() dto: IdDto, @Body() updateArtistDto: UpdateArtistDto) {
    try {
      return this.artistsService.update(dto.id, updateArtistDto);
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() dto: IdDto) {
    try {
      return this.artistsService.remove(dto.id);
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
