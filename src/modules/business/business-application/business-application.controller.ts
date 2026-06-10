import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { BusinessApplicationService } from './business-application.service';
import { CreateBusinessApplicationDto } from './dto/create-business-application.dto';
import { UpdateBusinessApplicationDto } from './dto/update-business-application.dto';

@Controller('business-application/api/v1')
export class BusinessApplicationController {
  constructor(
    private readonly businessApplicationService: BusinessApplicationService,
  ) {}

  // create application
  // POST -> business-application/api/v1/applied
  @Post('applied')
  create(
    @Body()
    createBusinessApplicationDto: CreateBusinessApplicationDto,
  ) {
    return this.businessApplicationService.createBusinessApplication(
      createBusinessApplicationDto,
    );
  }

  // get all applications
  // GET -> business-application/api/v1/get/all-application
  @Get('get/all-application')
  findAll() {
    return this.businessApplicationService.getAllApplication();
  }

  // get single application
  // GET -> business-application/api/v1/get/single-application/:id
  @Get('get/single-application/:id')
  findOne(@Param('id') id: string) {
    return this.businessApplicationService.getSingleApplication(id);
  }

  // update application
  // PATCH -> business-application/api/v1/upd-application/:id
  @Patch('upd-application/:id')
  update(
    @Param('id') id: string,
    @Body()
    updateBusinessApplicationDto: UpdateBusinessApplicationDto,
  ) {
    return this.businessApplicationService.updateBusinessApp(
      id,
      updateBusinessApplicationDto,
    );
  }

  // delete application
  // DELETE -> business-application/api/v1/del-application/:id
  @Delete('del-application/:id')
  remove(@Param('id') id: string) {
    return this.businessApplicationService.deleteBusinessApp(id);
  }
}
