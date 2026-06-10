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
  officeLocation: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @IsString()
  @IsNotEmpty()
  tradeLicense: string;

  @IsOptional()
  @IsString()
  passportFile?: string;

  @IsString()
  @IsNotEmpty()
  photo: string;

  @IsEmail()
  createdBy: string;

  @IsString()
  @IsNotEmpty()
  packageId: string;

  @IsOptional()
  @IsString()
  b2bid?: string;
}
