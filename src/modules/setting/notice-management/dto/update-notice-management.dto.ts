import { PartialType } from '@nestjs/mapped-types';
import { CreateNoticeManagementDto } from './create-notice-management.dto';

export class UpdateNoticeManagementDto extends PartialType(CreateNoticeManagementDto) {}
