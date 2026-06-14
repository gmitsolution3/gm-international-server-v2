import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsNumber,
  IsDateString,
  IsOptional,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ValueItemDto {
  @IsString()
  @IsNotEmpty()
  value: string;
}

export class CreateUmrahHajjPackageDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsArray()
  @IsString({ each: true })
  gallery_image: string[];

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsOptional()
  discount_price?: number;

  @IsDateString()
  @IsNotEmpty()
  departure_date: string;

  @IsDateString()
  @IsNotEmpty()
  return_date: string;

  @IsNumber()
  @IsNotEmpty()
  seats: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ValueItemDto)
  includes: ValueItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ValueItemDto)
  excludes: ValueItemDto[];

  @IsString()
  @IsEnum(['active', 'inactive', 'archived'])
  package_status: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
