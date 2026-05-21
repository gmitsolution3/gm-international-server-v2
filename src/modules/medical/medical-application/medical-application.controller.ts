import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicalApplicationService } from './medical-application.service';
import { CreateMedicalApplicationDto } from './dto/create-medical-application.dto';
import { UpdateMedicalApplicationDto } from './dto/update-medical-application.dto';

@Controller('medical-application')
export class MedicalApplicationController {
  constructor(
    private readonly medicalApplicationService: MedicalApplicationService,
  ) {}
 
  @Post()
  create(@Body() createMedicalApplicationDto: CreateMedicalApplicationDto) {
    return this.medicalApplicationService.create(createMedicalApplicationDto);
  }

  @Get()
  findAll() {
    return this.medicalApplicationService.findAll();
  }

  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalApplicationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicalApplicationDto: UpdateMedicalApplicationDto,
  ) {
    return this.medicalApplicationService.update(
      id,
      updateMedicalApplicationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalApplicationService.remove(id);
  }
}
