import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalApplicationDto } from './create-medical-application.dto';

export class UpdateMedicalApplicationDto extends PartialType(CreateMedicalApplicationDto) {}
