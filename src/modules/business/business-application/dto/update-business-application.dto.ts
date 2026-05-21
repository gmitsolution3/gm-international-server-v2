import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessApplicationDto } from './create-business-application.dto';

export class UpdateBusinessApplicationDto extends PartialType(CreateBusinessApplicationDto) {}
