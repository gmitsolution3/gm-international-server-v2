import { PartialType } from '@nestjs/mapped-types';
import { CreateUmrahHajjBookingDto } from './create-umrah-application.dto';

export class UpdateUmrahHajjBookingDto extends PartialType(
  CreateUmrahHajjBookingDto,
) {}
