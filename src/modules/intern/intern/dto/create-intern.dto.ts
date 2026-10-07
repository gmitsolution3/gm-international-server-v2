import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum ProfileStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  COMPLETED = 'COMPLETED',
  TERMINATED = 'TERMINATED',
}

export class CreateInternProfileDto {
  // Personal Information
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'First name must be at least 2 characters' })
  @MaxLength(50, { message: 'First name is too long' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Last name must be at least 2 characters' })
  @MaxLength(50, { message: 'Last name is too long' })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(10, { message: 'Phone must be at least 10 digits' })
  @MaxLength(15, { message: 'Phone is too long' })
  @Matches(/^[0-9+\-\s]+$/, { message: 'Invalid phone format' })
  phone: string;

  @IsEnum(GenderEnum, { message: 'Invalid gender value' })
  gender: GenderEnum;

  @Type(() => Date)
  @IsDate({ message: 'Date of birth must be a valid date' })
  dateOfBirth: Date;

  @IsString()
  @MinLength(5, { message: 'Address is required' })
  @MaxLength(200, { message: 'Address is too long' })
  address: string;

  // Academic Information
  @IsString()
  @MinLength(2, { message: 'University is required' })
  @MaxLength(120, { message: 'University name is too long' })
  university: string;

  @IsString()
  @MinLength(2, { message: 'Degree is required' })
  @MaxLength(100, { message: 'Degree name is too long' })
  degree: string;

  @IsString()
  @MinLength(2, { message: 'Major is required' })
  @MaxLength(100, { message: 'Major name is too long' })
  major: string;

  @Type(() => Number)
  @IsInt({ message: 'Graduation year must be a whole number' })
  @Min(1990)
  @Max(2100)
  graduationYear: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'CGPA must be a valid number' })
  @Min(0)
  @Max(4)
  cgpa: number;

  // Batch Information
  @IsString()
  @IsNotEmpty({ message: 'Please select a batch' })
  batchId: string;

  @Type(() => Date)
  @IsDate({ message: 'Start date must be a valid date' })
  startDate: Date;

  @Type(() => Date)
  @IsDate({ message: 'End date must be a valid date' })
  endDate: Date;

  @IsEnum(ProfileStatusEnum, { message: 'Invalid profile status' })
  status: ProfileStatusEnum;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Notes are too long' })
  notes?: string;

  // Optional
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
