import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEmail,
  IsArray,
  IsDateString,
} from 'class-validator';

export class CreateTouristAccountDto {
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsString()
  @IsNotEmpty()
  destinationCountry: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  coverageAreas: string[];


  @IsString()
  @IsNotEmpty()
  clientPhone: string;

  @IsString()
  @IsNotEmpty()
  passportNumber: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsNumber()
  @IsNotEmpty()
  numberOfGuests: number;

  @IsString()
  @IsNotEmpty()
  duration: string;

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
