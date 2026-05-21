import { PartialType } from '@nestjs/mapped-types';
import { CreateTouristApplicationDto } from './create-tourist-application.dto';

export class UpdateTouristApplicationDto extends PartialType(CreateTouristApplicationDto) {}
