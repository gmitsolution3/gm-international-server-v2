import { PartialType } from '@nestjs/mapped-types';
import { CreateOfficeAddressDto } from './create-office-address.dto';

export class UpdateOfficeAddressDto extends PartialType(CreateOfficeAddressDto) {}
