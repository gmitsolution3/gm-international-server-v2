import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessPkgDto } from './create-business-pkg.dto';

export class UpdateBusinessPkgDto extends PartialType(CreateBusinessPkgDto) {}
