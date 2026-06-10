import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalReviewDto } from './create-medical-review.dto';

export class UpdateMedicalReviewDto extends PartialType(CreateMedicalReviewDto) {}
