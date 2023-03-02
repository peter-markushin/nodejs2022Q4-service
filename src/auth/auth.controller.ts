import {
  Body,
  Request,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from '../models/users/dto/create-user.dto';
import { User } from '../models/users/entities/user.entity';
import { UsersService } from '../models/users/users.service';
import { LocalGuard } from './guard/local.guard';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Public } from './is-public.decorator';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Public()
  @UseGuards(LocalGuard)
  @Post('login')
  @HttpCode(StatusCodes.OK)
  async login(@Body() loginDto: LoginDto, @Request() request) {
    return await this.authService.loginUser(request.user);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(StatusCodes.OK)
  async refresh(@Request() requuest) {
    const user: JwtPayload & { refreshToken: string } = requuest.user;

    return await this.authService.refreshTokens(user);
  }
}
