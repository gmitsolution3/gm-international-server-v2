import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSearchingDto {
  @IsString()
  @IsNotEmpty()
  service: string;

  @IsString()
  @IsNotEmpty()
  query: string;
}
