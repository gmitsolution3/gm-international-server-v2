// import {
//   IsString,
//   IsNotEmpty,
//   IsOptional,
//   IsNumber,
//   IsArray,
//   ValidateNested,
//   Min,
// } from 'class-validator';
// import { Type } from 'class-transformer';

// // Sub-DTO for DocItem
// class DocItemDto {
//   @IsString()
//   @IsNotEmpty()
//   value: string;
// }

// // Sub-DTO for Pricing Object
// class PricingDto {
//   @IsNumber()
//   @Min(0)
//   b2b: number;

//   @IsNumber()
//   @Min(0)
//   b2c: number;
// }

// export class CreateVisaRateDto {
//   @IsString()
//   @IsNotEmpty()
//   country: string;

//   @IsString()
//   @IsNotEmpty()
//   visaType: string;

//   @IsString()
//   @IsNotEmpty()
//   processingTime: string;

//   @ValidateNested()
//   @Type(() => PricingDto)
//   @IsNotEmpty()
//   pricing: PricingDto;

//   @IsString()
//   @IsNotEmpty()
//   validity: string;

//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => DocItemDto)
//   basicDocuments: DocItemDto[];

//   @IsOptional()
//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => DocItemDto)
//   businessDocuments?: DocItemDto[];

//   @IsOptional()
//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => DocItemDto)
//   jobHolderDocuments?: DocItemDto[];

//   @IsOptional()
//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => DocItemDto)
//   studentDocuments?: DocItemDto[];

//   @IsOptional()
//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => DocItemDto)
//   coupleDocuments?: DocItemDto[];

//   @IsOptional()
//   @IsString()
//   otherInformation?: string;
// }

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  ValidateNested,
  Min,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

// Sub-DTO for Pricing Object
class PricingDto {
  @IsNumber()
  @Min(0)
  b2b: number;

  @IsNumber()
  @Min(0)
  b2c: number;
}

export class CreateVisaRateDto {
  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  visaType: string;

  @IsString()
  @IsNotEmpty()
  processingTime: string;

  @ValidateNested()
  @Type(() => PricingDto)
  @IsNotEmpty()
  pricing: PricingDto;

  @IsString()
  @IsNotEmpty()
  validity: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  basicDocuments: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  businessDocuments?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  jobHolderDocuments?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  studentDocuments?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  coupleDocuments?: string[];

  @IsOptional()
  @IsString()
  otherInformation?: string;
}