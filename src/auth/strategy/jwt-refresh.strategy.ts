import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Payload } from '../payload.type';
import { env } from 'node:process';
import { UsersService } from '../../models/users/users.service';
import { User } from '../../models/users/entities/user.entity';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: env.JWT_SECRET_REFRESH_KEY,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: Payload) {
    if (!request.body.refreshToken) {
      throw new UnauthorizedException();
    }

    const refreshToken = request.body.refreshToken;
    let user: User;

    try {
      user = await this.userService.findOne(payload.userId);
    } catch (e) {
      throw new ForbiddenException();
    }

    if (user.refreshToken !== refreshToken) {
      throw new ForbiddenException();
    }

    return { ...payload, refreshToken };
  }
}
