import * as crypto from 'node:crypto';
import { Exclude } from 'class-transformer';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateFailed } from '../errors/UpdateFailed';

export class User {
  id: string; // uuid v4
  login: string;
  @Exclude()
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  constructor(dto: Partial<User>) {
    Object.assign(this, dto);

    this.id = crypto.randomUUID();
    this.version = 1;
    this.createdAt = this.updatedAt = new Date().getTime();
  }

  update(dto: UpdateUserDto): void {
    if (dto.oldPassword !== this.password) {
      throw new UpdateFailed('Password mismatch');
    }

    this.password = dto.newPassword;
    this.version += 1;
    this.updatedAt = new Date().getTime();
  }
}
