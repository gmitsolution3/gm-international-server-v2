import { PartialType } from '@nestjs/mapped-types';
import { CreateSearchingDto } from './create-searching.dto';

export class UpdateSearchingDto extends PartialType(CreateSearchingDto) {}
