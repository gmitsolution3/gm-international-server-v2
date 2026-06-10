import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  Max,
  IsOptional,
  IsMongoId,
} from 'class-validator';

export class CreateMedicalReviewDto {
  @IsNotEmpty()
  @IsMongoId({ message: 'packageId একটি বৈধ Mongo ID হতে হবে' })
  readonly packageId: string;

  @IsNotEmpty()
  @IsMongoId({ message: 'userId একটি বৈধ Mongo ID হতে হবে' })
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'রেটিং সর্বনিম্ন ১ হতে হবে' })
  @Max(5, { message: 'রেটিং সর্বোচ্চ ৫ হতে হবে' })
  readonly rating: number;

  @IsOptional()
  @IsString()
  readonly comment?: string;
}
