import { PartialType } from '@nestjs/mapped-types';
import { CreateStdPkgDto } from './create-std-pkg.dto';

export class UpdateStdPkgDto extends PartialType(CreateStdPkgDto) {}
