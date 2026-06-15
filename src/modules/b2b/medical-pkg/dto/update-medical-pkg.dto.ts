import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalPkgDto } from './create-medical-pkg.dto';

export class UpdateMedicalPkgDto extends PartialType(CreateMedicalPkgDto) {}
