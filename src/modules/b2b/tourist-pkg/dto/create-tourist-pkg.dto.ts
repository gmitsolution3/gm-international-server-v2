import {
  IsArray,
  IsMongoId,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateTouristPkgDto {
  @IsString()
  @IsNotEmpty()
  action: string;

  @IsArray()
  @IsMongoId({ each: true })
  packageIds: string[];
}

export class UpdateTouristPkgDto {
  @IsOptional()
  @IsString()
  action?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  packageIds?: string[];
}