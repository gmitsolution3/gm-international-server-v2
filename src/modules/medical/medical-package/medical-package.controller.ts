import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicalPackageService } from './medical-package.service';
import { CreateMedicalPackageDto } from './dto/create-medical-package.dto';
import { UpdateMedicalPackageDto } from './dto/update-medical-package.dto';

// apis
// post: //localhost:8080/medical-pkg/api/v2/create-medical-pkg
// get: //localhost:8080/medical-pkg/api/v2/get/all-medical-pkg
// get: //localhost:8080/medical-pkg/api/v2/get/medical/:id
// patch: //localhost:8080/medical-pkg/api/v2/upd-medical-pkg/:id
// put:localhost:8080/scholarship-package/api/v1/upd-whole-pkg/6a0d8d4dd79f8b17255fee3a
// delete: //localhost:8080/medical-pkg/api/v2/del-medical-pkg/:id

@Controller('medical-package/api/v1')
export class MedicalPackageController {
  constructor(private readonly medicalPackageService: MedicalPackageService) {}

  // CREATE PKG
  // api will be -> medical-pkg/api/v2/create-medical-pkg
  @Post('create-medical-pkg')
  create(@Body() createMedicalPackageDto: CreateMedicalPackageDto) {
    return this.medicalPackageService.createMedicalPkg(createMedicalPackageDto);
  }

  // GET ALL PKG
  // api will be -> medical-pkg/api/v2/get/all-medical-pkg
  @Get('get/all-medical-pkg')
  findAll() {
    return this.medicalPackageService.findAll();
  }

  // GET single PKG
  // api will be -> medical-pkg/api/v2/get/medical/:id
  @Get('get/medical/:id')
  findOne(@Param('id') id: string) {
    return this.medicalPackageService.findOne(id);
  }

  // update pkg
  // api will be -> medical-pkg/api/v2/upd-medical-pkg/:id
  @Patch('upd-medical-pkg/:id')
  update(
    @Param('id') id: string,
    @Body() updateMedicalPackageDto: UpdateMedicalPackageDto,
  ) {
    return this.medicalPackageService.update(id, updateMedicalPackageDto);
  }

  // update pkg
  // api will be -> medical-pkg/api/v2/del-medical-pkg/:id
  @Delete('del-medical-pkg/:id')
  remove(@Param('id') id: string) {
    return this.medicalPackageService.remove(id);
  }
}
