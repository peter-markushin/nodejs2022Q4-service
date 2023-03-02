import { env } from 'node:process';
import { Injectable } from '@nestjs/common';
import { User } from '../models/users/entities/user.entity';
import { UsersService } from '../models/users/users.service';
import { JwtPayload } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async getUserWithPasswordCheck(
    login: string,
    password: string,
  ): Promise<User | null> {
    let user: User;

    try {
      user = await this.userService.findOneByLogin(login);
    } catch (e) {
      return null;
    }

    if (!user.verifyPassword(password)) {
      return null;
    }

    return user;
  }

  async loginUser(user: User) {
    const tokens = this.generateTokens(user.id, user.login);

    await this.userService.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  private generateTokens(userId: string, login: string) {
    const payload = {
      login: login,
      userId: userId,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: env.JWT_SECRET_KEY,
        expiresIn: env.TOKEN_EXPIRE_TIME,
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: env.JWT_SECRET_REFRESH_KEY,
        expiresIn: env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  }

  async refreshTokens(payload: JwtPayload) {
    const tokens = this.generateTokens(payload.userId, payload.login);

    await this.userService.updateRefreshToken(
      payload.userId,
      tokens.refreshToken,
    );

    return tokens;
  }
}
