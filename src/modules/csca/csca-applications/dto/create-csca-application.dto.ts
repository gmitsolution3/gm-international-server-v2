
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateCscaApplicationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  presentAddress: string;

  @IsString()
  @IsNotEmpty()
  permanentAddress: string;

  @IsString()
  @IsNotEmpty()
  lastQualification: string;

  @IsString()
  @IsNotEmpty()
  instituteName: string;

  @IsString()
  @IsNotEmpty()
  passingYear: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsUrl()
  @IsNotEmpty()
  certificateUrl: string;

  @IsUrl()
  @IsNotEmpty()
  photoUrl: string;

  @IsUrl()
  @IsNotEmpty()
  passportUrl: string;

  @IsUrl()
  @IsNotEmpty()
  nidUrl: string;

  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @IsString()
  @IsOptional()
  transactionId?: string;

  @IsUrl()
  @IsOptional()
  paymentReceiptUrl: string;

  @IsEmail()
  @IsOptional()
  userEmail?: string | null;
}