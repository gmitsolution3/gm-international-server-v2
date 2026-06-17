import { PartialType } from '@nestjs/mapped-types';
import { CreateStdAccountDto } from './create-std-account.dto';

export class UpdateStdAccountDto extends PartialType(CreateStdAccountDto) {}
