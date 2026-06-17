import { PartialType } from '@nestjs/mapped-types';
import { CreateMedAccountDto } from './create-med-account.dto';

export class UpdateMedAccountDto extends PartialType(CreateMedAccountDto) {}
