import { PartialType } from '@nestjs/mapped-types';
import { CreateVisaAccountDto } from './create-visa-account.dto';

export class UpdateVisaAccountDto extends PartialType(CreateVisaAccountDto) {}
