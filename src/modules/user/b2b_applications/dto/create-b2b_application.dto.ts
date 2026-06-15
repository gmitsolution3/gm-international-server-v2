import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumberString,
  IsDateString,
  IsUrl,
} from 'class-validator';

export class CreateB2BApplicationDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumberString()
  @IsNotEmpty()
  branchOfficeCount: string;

  @IsDateString()
  @IsNotEmpty()
  businessStartDate: string;

  @IsOptional()
  createdBy?: string;

  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  facebookPage?: string;

  @IsString()
  @IsNotEmpty()
  fatherName: string;

  @IsDateString()
  @IsOptional()
  issueDate?: string;

  @IsNumberString()
  @IsNotEmpty()
  mobile: string;

  @IsNumberString()
  @IsNotEmpty()
  mobileNumber: string;

  @IsString()
  @IsNotEmpty()
  motherName: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumberString()
  @IsNotEmpty()
  nid: string;

  @IsString()
  @IsNotEmpty()
  officeAddress: string;

  @IsString()
  @IsNotEmpty()
  officeSize: string;

  @IsString()
  @IsNotEmpty()
  organizationName: string;

  @IsString()
  @IsOptional()
  passport?: string;

  @IsString()
  @IsNotEmpty()
  presentAddress: string;

  @IsString()
  @IsNotEmpty()
  qualification: string;

  @IsNumberString()
  @IsOptional()
  tinNumber?: string;

  @IsNumberString()
  @IsOptional()
  tradeLicenseNumber?: string;

  @IsString()
  @IsOptional()
  website?: string;
}
