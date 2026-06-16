import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalPkgService } from './medical-pkg.service';
import { CreateMedicalPkgDto } from './dto/create-medical-pkg.dto';
import { UpdateMedicalPkgDto } from './dto/update-medical-pkg.dto';

@Controller('b2b-medical-pkg/api/v1')
export class MedicalPkgController {
  constructor(private readonly medicalPkgService: MedicalPkgService) {}

  // api will be -> b2b-medical-pkg/api/v1/create
  @Post('create')
  create(@Body() createMedicalPkgDto: CreateMedicalPkgDto) {
    return this.medicalPkgService.create(createMedicalPkgDto);
  }

  // api will be -> b2b-medical-pkg/api/v1/get-all-med-pkg
  @Get('get-all-med-pkg')
  findAll() {
    return this.medicalPkgService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalPkgService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicalPkgDto: UpdateMedicalPkgDto,
  ) {
    return this.medicalPkgService.update(+id, updateMedicalPkgDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalPkgService.remove(+id);
  }
}
