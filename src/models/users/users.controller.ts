import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdDto } from '../../common/dto/id.dto';
import { NotFound } from '../../common/errors/NotFound';
import { UpdateFailed } from '../../common/errors/UpdateFailed';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param() dto: IdDto) {
    try {
      return await this.usersService.findOne(dto.id);
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async update(@Param() dto: IdDto, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(dto.id, updateUserDto);
    } catch (e: unknown) {
      if (e instanceof NotFound) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      } else if (e instanceof UpdateFailed) {
        throw new HttpException('Bad request', HttpStatus.FORBIDDEN);
      }

      throw e;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() dto: IdDto) {
    try {
      return await this.usersService.remove(dto.id);
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
