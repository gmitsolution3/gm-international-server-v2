import {
  IsArray,
  IsMongoId,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateBusinessPkgDto {
  @IsString()
  @IsNotEmpty()
  action: string;

  @IsArray()
  @IsMongoId({ each: true })
  packageIds: string[];
}

// Update er jonno (Optional)
export class UpdateBusinessPkgDto {
  @IsOptional()
  @IsString()
  action?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  packageIds?: string[];
}