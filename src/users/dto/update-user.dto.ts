import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  oldPassword: string; // previous password
  @IsNotEmpty()
  newPassword: string; // new password
}
