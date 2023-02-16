import { Buffer } from 'node:buffer';
import { pbkdf2Sync, randomBytes, timingSafeEqual } from "node:crypto";
import { Exclude, Transform } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateFailed } from '../../common/errors/UpdateFailed';
import { CreateUserDto } from "../dto/create-user.dto";

const HASH_ALGO = 'sha512';
const ITERATIONS = 5432;
const KEY_LENGTH = 64;
const SALT_BYTES = 128;

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  login: string;

  @Column({ name: 'password' })
  @Exclude()
  _password: string;

  @Column()
  @Exclude()
  salt: string;

  @VersionColumn()
  version: number; // integer number, increments on update

  @CreateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value.getTime(), { toPlainOnly: true })
  private createdAt: Date; // timestamp of creation

  @UpdateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value.getTime(), { toPlainOnly: true })
  private updatedAt: Date; // timestamp of last update

  constructor(dto?: CreateUserDto) {
    if (dto) {
      this.login = dto.login;
      this.password = dto.password;
    }
  }

  private set password(password: string) {
    const saltBuffer = randomBytes(SALT_BYTES);

    this.salt = saltBuffer.toString('hex');
    this._password = pbkdf2Sync(password, saltBuffer, ITERATIONS, KEY_LENGTH, HASH_ALGO).toString('hex');
  }

  verifyPassword(password: string): boolean {
    const saltBuffer = Buffer.from(this.salt, 'hex');

    return timingSafeEqual(
      Buffer.from(this._password, 'hex'),
      pbkdf2Sync(password, saltBuffer, ITERATIONS, KEY_LENGTH, HASH_ALGO),
    );
  }

  update(dto: UpdateUserDto): void {
    if (!this.verifyPassword(dto.oldPassword)) {
      throw new UpdateFailed('Password mismatch');
    }

    this.password = dto.newPassword;
  }
}
