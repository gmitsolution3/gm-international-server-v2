import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsBoolean,
  IsOptional,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class GuestsDto {
  @IsNumber()
  readonly adults: number;

  @IsNumber()
  readonly children: number;

  @IsNumber()
  readonly infants: number;
}

class PackageInfoDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly thumbnail: string;

  @IsString()
  @IsNotEmpty()
  readonly packageName: string;
}

class LocationDto {
  @IsString()
  @IsNotEmpty()
  readonly country: string;

  @IsString()
  @IsNotEmpty()
  readonly destinationPlace: string;

  @IsString()
  @IsOptional()
  readonly subDestination?: string;
}

class DurationAndDatesDto {
  @IsString()
  @IsNotEmpty()
  readonly duration: string;

  @IsString()
  @IsNotEmpty()
  readonly dateFrom: string;

  @IsString()
  @IsNotEmpty()
  readonly startForm: string;
}

class IncludesAndExcludesDto {
  @IsArray()
  @IsString({ each: true })
  readonly includes: string[];

  @IsArray()
  @IsString({ each: true })
  readonly excludes: string[];
}

class ClientInfoDto {
  @IsString()
  @IsNotEmpty()
  readonly b2bId: string;

  @IsString()
  @IsNotEmpty()
  readonly form: string;
}

export class CreateTouristApplicationDto {
  @IsString()
  @IsNotEmpty()
  readonly fullName: string;

  @IsString()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly passportNumber: string;

  @IsString()
  @IsNotEmpty()
  readonly visaStatus: string;

  @IsString()
  @IsNotEmpty()
  readonly gender: string;

  @ValidateNested()
  @Type(() => GuestsDto)
  readonly guests: GuestsDto;

  @IsString()
  @IsNotEmpty()
  readonly airTicket: string;

  @IsArray()
  @IsString({ each: true })
  readonly foodPlan: string[];

  @IsArray()
  @IsString({ each: true })
  readonly transportation: string[];

  @IsArray()
  @IsString({ each: true })
  readonly hotelCategory: string[];

  @IsString()
  @IsNotEmpty()
  readonly paymentMethod: string;

  @IsString()
  @IsNotEmpty()
  readonly passportVisaImage: string;

  @IsString()
  @IsNotEmpty()
  readonly createdBy: string;

  @ValidateNested()
  @Type(() => PackageInfoDto)
  readonly packageInfo: PackageInfoDto;

  @ValidateNested()
  @Type(() => LocationDto)
  readonly location: LocationDto;

  @ValidateNested()
  @Type(() => DurationAndDatesDto)
  readonly durationAndDates: DurationAndDatesDto;

  @IsString()
  @IsNotEmpty()
  readonly totalCost: string;

  @IsBoolean()
  @IsOptional()
  readonly isInternationalPackage?: boolean;

  @ValidateNested()
  @Type(() => IncludesAndExcludesDto)
  readonly includesAndExcludes: IncludesAndExcludesDto;

  @ValidateNested()
  @Type(() => ClientInfoDto)
  readonly client: ClientInfoDto;
}
