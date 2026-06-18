
import {
  IsString,
  IsArray,
  IsOptional,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateMedicalPackageDto {
  @IsString()
  @IsNotEmpty()
  hospital_name: string;

  @IsString()
  @IsNotEmpty()
  country_name: string;

  @IsString()
  @IsNotEmpty()
  city_name: string;

  @IsString()
  @IsNotEmpty()
  provience: string;

  @IsString()
  @IsNotEmpty()
  photo: string;

  @IsString()
  @IsNotEmpty()
  hospital_type: string;

  @IsArray()
  @IsString({ each: true })
  department: string[];

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsOptional()
  rating?: number;

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}

export class FilterMedicalPackageDto {
  country?: string;
  city?: string;
  provience?: string;
  dept?: string;
}