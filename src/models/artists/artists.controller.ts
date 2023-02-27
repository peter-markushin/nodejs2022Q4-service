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
import { IdDto } from '../../common/dto/id.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  async findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param() dto: IdDto) {
    try {
      return await this.artistsService.findOne(dto.id);
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async update(@Param() dto: IdDto, @Body() updateArtistDto: UpdateArtistDto) {
    try {
      return await this.artistsService.update(dto.id, updateArtistDto);
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() dto: IdDto) {
    try {
      return await this.artistsService.remove(dto.id);
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
