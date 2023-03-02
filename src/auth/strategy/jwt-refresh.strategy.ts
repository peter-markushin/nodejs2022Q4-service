import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Payload } from '../payload.type';
import { env } from 'node:process';
import { UsersService } from "../../models/users/users.service";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.JWT_SECRET_REFRESH_KEY,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: Payload) {
    const refreshToken = request.get('Authorization').replace('Bearer', '').trim();

    if (!request.body.refreshToken) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOne(payload.sub);

    if (!user || request.body.refreshToken !== refreshToken) {
      throw new ForbiddenException();
    }

    return { ...payload, refreshToken };
  }
}