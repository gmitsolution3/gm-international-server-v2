import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsInt,
  IsPositive,
  IsDateString,
} from 'class-validator';

export class CreateAboutDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  bio: string;

  @IsUrl()
  @IsNotEmpty()
  image: string; 

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  order_index: number;
}
