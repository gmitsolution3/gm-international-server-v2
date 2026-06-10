import { PartialType } from '@nestjs/mapped-types';
import { CreateB2bUserDto } from './create-b2b_user.dto';

export class UpdateB2bUserDto extends PartialType(CreateB2bUserDto) {}
