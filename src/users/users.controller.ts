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
import { IdDto } from './dto/id.dto';
import { NotFound } from './errors/NotFound';
import { UpdateFailed } from './errors/UpdateFailed';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() dto: IdDto) {
    try {
      return this.usersService.findOne(dto.id);
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  update(@Param() dto: IdDto, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.update(dto.id, updateUserDto);
    } catch (e: unknown) {
      if (e instanceof NotFound) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      } else if (e instanceof UpdateFailed) {
        throw new HttpException('Bad request', HttpStatus.FORBIDDEN);
      }
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() dto: IdDto) {
    try {
      return this.usersService.remove(dto.id);
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
