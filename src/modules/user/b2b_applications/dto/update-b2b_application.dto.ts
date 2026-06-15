import { PartialType } from '@nestjs/mapped-types';
import { CreateB2BApplicationDto } from './create-b2b_application.dto';

export class UpdateB2bApplicationDto extends PartialType(CreateB2BApplicationDto) {}
