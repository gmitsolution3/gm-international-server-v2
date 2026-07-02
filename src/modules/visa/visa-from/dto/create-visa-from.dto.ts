import { IsString } from 'class-validator';

export class CreateVisaFromDto {
  @IsString()
  country: string;

  @IsString()
  visaType: string;
}
