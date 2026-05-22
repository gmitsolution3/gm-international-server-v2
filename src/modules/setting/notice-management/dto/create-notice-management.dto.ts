import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateNoticeManagementDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['student', 'medical', 'tourist', 'business'], {
    message: 'noticeFor must be either student, teacher, or all',
  })
  noticeFor: string;
}
