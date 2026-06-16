import { Injectable } from '@nestjs/common';
import { CreateCscaPackageDto } from './dto/create-csca-package.dto';
import { UpdateCscaPackageDto } from './dto/update-csca-package.dto';

@Injectable()
export class CscaPackageService {
  create(createCscaPackageDto: CreateCscaPackageDto) {
    return 'This action adds a new cscaPackage';
  }

  findAll() {
    return `This action returns all cscaPackage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cscaPackage`;
  }

  update(id: number, updateCscaPackageDto: UpdateCscaPackageDto) {
    return `This action updates a #${id} cscaPackage`;
  }

  remove(id: number) {
    return `This action removes a #${id} cscaPackage`;
  }
}
