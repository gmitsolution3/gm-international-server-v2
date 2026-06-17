import { PartialType } from '@nestjs/mapped-types';
import { CreateTouristAccountDto } from './create-tourist-account.dto';

export class UpdateTouristAccountDto extends PartialType(CreateTouristAccountDto) {}
