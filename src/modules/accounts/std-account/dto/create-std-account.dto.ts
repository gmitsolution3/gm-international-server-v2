import {
  IsString,
  IsNumber,
  IsEmail,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';

export class CreateStdAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  userEmail: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  degree: string;

  @IsString()
  @IsNotEmpty()
  university: string;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsNumber()
  @IsNotEmpty()
  advance: number;

  @IsNumber()
  @IsNotEmpty()
  due: number;

  @IsString()
  @IsNotEmpty()
  intake: string;

}