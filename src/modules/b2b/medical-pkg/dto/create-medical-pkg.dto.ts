import {
  IsArray,
  IsMongoId,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateMedicalPkgDto {
  @IsString()
  @IsNotEmpty()
  action: string;

  @IsArray()
  @IsMongoId({ each: true })
  packageIds: string[];
}

// Update korar dorkar hole (Optional)
export class UpdateMedicalPkgDto {
  @IsOptional()
  @IsString()
  action?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  packageIds?: string[];
}
