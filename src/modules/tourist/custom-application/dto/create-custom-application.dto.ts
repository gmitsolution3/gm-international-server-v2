import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateTouristQueryDto {
  @IsString()
  @IsNotEmpty()
  readonly fullName: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly visaStatus: string;

  @IsString()
  @IsNotEmpty()
  readonly gender: string;

  @IsString()
  @IsNotEmpty()
  readonly airTicket: string;

  @IsString()
  @IsNotEmpty()
  readonly destinationCountry: string;

  @IsString()
  @IsNotEmpty()
  readonly destinationPlace: string;

  @IsString()
  @IsNotEmpty()
  readonly days: string;

  @IsString()
  @IsNotEmpty()
  readonly nights: string;

  @IsArray()
  @IsString({ each: true })
  readonly food: string[];

  @IsString()
  @IsNotEmpty()
  readonly transportation: string;

  @IsString()
  @IsNotEmpty()
  readonly dateFrom: string;

  @IsString()
  @IsNotEmpty()
  readonly dateTo: string;

  @IsString()
  @IsOptional()
  readonly hotelCategory?: string;

  @IsString()
  @IsNotEmpty()
  readonly passportVisaFile: string;
}
