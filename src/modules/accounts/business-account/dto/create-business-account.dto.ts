import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class CreateBusinessAccountDto {
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsString()
  @IsNotEmpty()
  clientPhone: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  officeLocation: string;

  @IsString()
  @IsNotEmpty()
  passportNumber: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsNumber()
  @IsNotEmpty()
  advance: number;

  @IsNumber()
  @IsNotEmpty()
  due: number; // Payload থেকে আসা due

  @IsEmail()
  @IsNotEmpty()
  submittedBy: string; // Payload থেকে আসা email (auth)

  @IsString()
  @IsOptional() // যেহেতু remarks ফাঁকা থাকতে পারে, তাই IsOptional দেওয়া নিরাপদ
  remarks: string;
}
