import { PartialType } from '@nestjs/mapped-types';
import { CreateVisaRateDto } from './create-visa-rate.dto';

export class UpdateVisaRateDto extends PartialType(CreateVisaRateDto) {}
