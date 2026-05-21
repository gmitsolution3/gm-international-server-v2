import { PartialType } from '@nestjs/mapped-types';
import { CreateTouristQueryDto } from './create-custom-application.dto';

export class UpdateCustomApplicationDto extends PartialType(CreateTouristQueryDto) {}
