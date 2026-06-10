import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateB2bUserDto {
  @IsString()
  userName: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  password: string;

  @IsString()
  userRole: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  b2bProfileId: string;

  @IsString()
  createdBy: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
