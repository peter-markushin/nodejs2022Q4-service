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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { IdDto } from '../common/dto/id.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param() dto: IdDto) {
    try {
      return this.tracksService.findOne(dto.id);
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  update(@Param() dto: IdDto, @Body() updateTrackDto: UpdateTrackDto) {
    try {
      return this.tracksService.update(dto.id, updateTrackDto);
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() dto: IdDto) {
    try {
      return this.tracksService.remove(dto.id);
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
