import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsDateString,
  IsIn,
} from 'class-validator';

export class CreateVideoGalleryDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  @IsNotEmpty()
  url: string; 

  @IsUrl()
  @IsNotEmpty()
  thumbnail: string; 

  @IsDateString()
  @IsNotEmpty()
  createdAt: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['published', 'draft', 'archived'], {
    message: 'status must be either published, draft, or archived',
  })
  status: string;
}
