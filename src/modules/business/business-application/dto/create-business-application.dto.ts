
import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateBusinessApplicationDto {
  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  passport: string;

  @IsString()
  @IsNotEmpty()
  visitingCard: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  dateOfBirth: string;

  @IsString()
  @IsNotEmpty()
  designation: string;

  @IsString()
  @IsNotEmpty()
  companyType: string;

  @IsString()
  @IsNotEmpty()
  officeLocation: string;

  @IsString()
  @IsNotEmpty()
  travelPurpose: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  travelPlan: string;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @IsEmail()
  @IsNotEmpty()
  createdBy: string;
}
