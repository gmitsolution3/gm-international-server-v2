import { PartialType } from '@nestjs/mapped-types';
import { CreateCscaPackageDto } from './create-csca-package.dto';

export class UpdateCscaPackageDto extends PartialType(CreateCscaPackageDto) {}
