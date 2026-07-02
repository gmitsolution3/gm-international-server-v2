import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { VisaApplicationsService } from './visa-applications.service';
import { CreateVisaApplicationDto } from './dto/create-visa-application.dto';
import { UpdateVisaApplicationDto } from './dto/update-visa-application.dto';

@Controller('visa-applications')
export class VisaApplicationsController {
  constructor(
    private readonly visaApplicationsService: VisaApplicationsService,
  ) {}

  // POST /visa-applications/insert
  @Post('insert')
  create(
    @Body()
    createVisaApplicationDto: CreateVisaApplicationDto,
  ) {
    return this.visaApplicationsService.create(createVisaApplicationDto);
  }

  // GET /visa-applications
  @Get()
  findAll() {
    return this.visaApplicationsService.findAll();
  }

  // GET /visa-applications/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visaApplicationsService.findOne(id);
  }

  // PATCH /visa-applications/:id
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateVisaApplicationDto: UpdateVisaApplicationDto,
  ) {
    return this.visaApplicationsService.update(id, updateVisaApplicationDto);
  }

  // DELETE /visa-applications/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visaApplicationsService.remove(id);
  }
}
