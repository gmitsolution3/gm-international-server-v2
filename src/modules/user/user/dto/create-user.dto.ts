import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  _id: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  userRole: string;

  @IsString()
  avatar: string;

  createdAt: Date;
  updatedAt: Date;
}
