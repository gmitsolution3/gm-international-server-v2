import { IsArray, IsNumber, IsMongoId, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStdPkgDto {
  @IsArray()
  @IsMongoId({ each: true })
  packageId: string[];

  @IsNumber()
  @Min(0)
  packageCount: number;
}

export class UpdateScholarshipPackageDto {
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  packageId?: string[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  packageCount?: number;
}