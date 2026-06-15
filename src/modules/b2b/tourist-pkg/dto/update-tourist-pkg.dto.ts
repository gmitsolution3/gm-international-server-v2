import { PartialType } from '@nestjs/mapped-types';
import { CreateTouristPkgDto } from './create-tourist-pkg.dto';

export class UpdateTouristPkgDto extends PartialType(CreateTouristPkgDto) {}
