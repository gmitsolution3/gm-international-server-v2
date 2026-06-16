import { PartialType } from '@nestjs/mapped-types';
import { CreateCscaApplicationDto } from './create-csca-application.dto';

export class UpdateCscaApplicationDto extends PartialType(CreateCscaApplicationDto) {}
