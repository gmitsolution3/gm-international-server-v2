import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsNumber,
  IsPositive,
  IsDateString,
} from 'class-validator';

export class CreateImageGalleryDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  alt: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  @IsNotEmpty()
  createdAt: string; 

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  size: number;
}