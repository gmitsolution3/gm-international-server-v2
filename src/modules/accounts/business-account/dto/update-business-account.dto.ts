import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessAccountDto } from './create-business-account.dto';

export class UpdateBusinessAccountDto extends PartialType(CreateBusinessAccountDto) {}
