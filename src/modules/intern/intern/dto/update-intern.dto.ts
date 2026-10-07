import { PartialType } from '@nestjs/mapped-types';
import { CreateInternProfileDto } from './create-intern.dto';

export class UpdateInternDto extends PartialType(CreateInternProfileDto) {}
