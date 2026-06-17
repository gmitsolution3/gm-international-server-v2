import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEmail,
  IsDateString,
} from 'class-validator';

export class CreateVisaAccountDto {
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsString()
  @IsNotEmpty()
  clientPhone: string;

  @IsString()
  @IsNotEmpty()
  passportNumber: string;

  @IsString()
  @IsNotEmpty()
  dateOfBirth: string; 

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
  due: number; 

  @IsEmail()
  @IsNotEmpty()
  submittedBy: string;
}
