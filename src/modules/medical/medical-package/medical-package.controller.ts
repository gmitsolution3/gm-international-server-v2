import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MedicalPackageService } from './medical-package.service';
import { CreateMedicalPackageDto, FilterMedicalPackageDto } from './dto/create-medical-package.dto';
import { UpdateMedicalPackageDto } from './dto/update-medical-package.dto';

// apis
// post: //localhost:8080/medical-pkg/api/v2/create-medical-pkg
// get: //localhost:8080/medical-pkg/api/v2/get/all-medical-pkg
// get: //localhost:8080/medical-pkg/api/v1/get-search-result
// get: //localhost:8080/medical-pkg/api/v2/get/medical/:id
// patch: //localhost:8080/medical-pkg/api/v2/upd-medical-pkg/:id
// put:localhost:8080/scholarship-package/api/v1/upd-whole-pkg/6a0d8d4dd79f8b17255fee3a
// delete: //localhost:8080/medical-pkg/api/v2/del-medical-pkg/:id

@Controller('medical-pkg/api/v1')
export class MedicalPackageController {
  constructor(private readonly medicalPackageService: MedicalPackageService) {}

  // CREATE PKG
  // api will be -> medical-pkg/api/v1/create-medical-pkg
  @Post('create-medical-pkg')
  create(@Body() createMedicalPackageDto: CreateMedicalPackageDto) {
    return this.medicalPackageService.createMedicalPkg(createMedicalPackageDto);
  }

  // GET ALL PKG
  // api will be -> medical-pkg/api/v1/get/all-medical-pkg
  @Get('get/all-medical-pkg')
  findAll() {
    return this.medicalPackageService.findAll();
  }
  @Get('get/home-medical-pkg')
  findHomeMedicalPkg() {
    return this.medicalPackageService.findHomeMedicalPkg();
  }

  // GET single PKG
  // api will be -> medical-pkg/api/v1/get/medical/:id
  @Get('get/medical/:id')
  findOne(@Param('id') id: string) {
    return this.medicalPackageService.findOne(id);
  }

  // get filter data
  // api will be-> medical-pkg/api/v1/hospital-filters
  @Get('hospital-filters')
  getHospitalFilters() {
    return this.medicalPackageService.getHospitalFilters();
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

  // search api
  // api will be -> medical-pkg/api/v1/get-search-result
  @Get('get-search-result')
  getSearchResult(@Query('search') search: string) {
    return this.medicalPackageService.getMedicalSearchResult(search);
  }

  // get filter medical data
  // api will be -> medical-pkg/api/v1/filtered-medical-list
  @Get('filtered-medical-list')
  getFilteredMedicalList(@Query() query: FilterMedicalPackageDto) {
    return this.medicalPackageService.getFilteredMedicalList(query);
  }

  // update pkg
  // api will be -> medical-pkg/api/v2/del-medical-pkg/:id
  @Delete('del-medical-pkg/:id')
  remove(@Param('id') id: string) {
    return this.medicalPackageService.remove(id);
  }
}
