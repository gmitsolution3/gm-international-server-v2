import { PartialType } from '@nestjs/mapped-types';
import { CreateVisaFromDto } from './create-visa-from.dto';

export class UpdateVisaFromDto extends PartialType(CreateVisaFromDto) {}
