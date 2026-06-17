import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEmail,
  IsDateString,
} from 'class-validator';

export class CreateMedAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  hospitalName: string;

  @IsString()
  @IsNotEmpty()
  countryName: string;

  @IsNumber()
  @IsNotEmpty()
  patientAge: number;

  @IsString()
  @IsNotEmpty()
  patientDisease: string;

  @IsString()
  @IsNotEmpty()
  patientPhone: string;

  @IsString()
  @IsNotEmpty()
  flyingDate: string;

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
