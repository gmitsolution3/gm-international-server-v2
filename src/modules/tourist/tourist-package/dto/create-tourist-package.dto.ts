import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateTouristPackageDto {
  @IsString()
  @IsNotEmpty()
  readonly p_title: string;

  @IsString()
  @IsNotEmpty()
  readonly p_price: string;

  @IsString()
  @IsNotEmpty()
  readonly number_of_member: string;

  @IsString()
  @IsNotEmpty()
  readonly duration: string;

  @IsBoolean()
  readonly is_with_air_ticket: boolean;

  @IsString()
  @IsNotEmpty()
  readonly start_form: string;

  @IsArray()
  @IsString({ each: true })
  readonly includes: string[];

  @IsArray()
  @IsString({ each: true })
  readonly excludes: string[];

  @IsArray()
  @IsString({ each: true })
  readonly country: string[];

  @IsString()
  @IsNotEmpty()
  readonly thumbnail: string;

  @IsArray()
  @IsString({ each: true })
  readonly gallery: string[];

  @IsArray()
  readonly tour_plan: any[];

  @IsString()
  @IsNotEmpty()
  readonly createdBy: string;

  // Optional Fields
  @IsBoolean()
  @IsOptional()
  readonly isB2B?: boolean;

  @IsString()
  @IsOptional()
  readonly b2b_price?: string;

  @IsBoolean()
  @IsOptional()
  readonly isInternationalPackage?: boolean;

  @IsString()
  @IsOptional()
  readonly international_package_price?: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
