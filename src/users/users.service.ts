import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { NotFound } from '../common/errors/NotFound';

@Injectable()
export class UsersService {
  private users: Record<string, User> = {};

  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    this.users[user.id] = user;

    return user;
  }

  findAll() {
    return Object.values(this.users);
  }

  findOne(id: string) {
    if (!this.users[id]) {
      throw new NotFound('User not found');
    }

    return this.users[id];
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!this.users[id]) {
      throw new NotFound('User not found');
    }

    this.users[id].update(updateUserDto);

    return this.users[id];
  }

  remove(id: string) {
    if (!this.users[id]) {
      throw new NotFound('User not found');
    }

    delete this.users[id];
  }
}
