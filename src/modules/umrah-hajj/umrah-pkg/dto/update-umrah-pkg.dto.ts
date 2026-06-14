import { PartialType } from '@nestjs/mapped-types';
import { CreateUmrahHajjPackageDto } from './create-umrah-pkg.dto';

export class UpdateUmrahPkgDto extends PartialType(CreateUmrahHajjPackageDto) {}
