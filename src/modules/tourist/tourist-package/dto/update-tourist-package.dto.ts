import { PartialType } from '@nestjs/mapped-types';
import { CreateTouristPackageDto } from './create-tourist-package.dto';

export class UpdateTouristPackageDto extends PartialType(CreateTouristPackageDto) {}
