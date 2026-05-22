import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsEmail,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

class AddressDetailsDto {
  @IsString()
  @IsNotEmpty()
  add: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  phone: string[];

  @IsUrl()
  @IsNotEmpty()
  image: string;
}

export class CreateOfficeAddressDto {
  @IsString()
  @IsNotEmpty()
  country: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDetailsDto)
  address: AddressDetailsDto[];
}
