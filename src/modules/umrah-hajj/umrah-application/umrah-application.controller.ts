import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UmrahApplicationService } from './umrah-application.service';
import { CreateUmrahHajjBookingDto } from './dto/create-umrah-application.dto';

@Controller('umrah-application/api/v1')
export class UmrahApplicationController {
  constructor(
    private readonly umrahApplicationService: UmrahApplicationService,
  ) {}

  // api will be post-> umrah-application/api/v1/create
  @Post('create')
  create(@Body() createUmrahApplicationDto: CreateUmrahHajjBookingDto) {
    return this.umrahApplicationService.create(createUmrahApplicationDto);
  }

  // api will be get-> umrah-application/api/v1/get-all-application
  @Get('get-all-application')
  findAll() {
    return this.umrahApplicationService.findAll();
  }

  // api will be get-> umrah-application/api/v1/find-single-application/:id
  @Get('find-single-application/:id')
  findOne(@Param('id') id: string) {
    return this.umrahApplicationService.findOne(id);
  }

  // api will be get-> umrah-application/api/v1/upd-application/:id
  @Patch('upd-application/:id')
  update(
    @Param('id') id: string,
    @Body() updateUmrahApplicationDto: CreateUmrahHajjBookingDto,
  ) {
    return this.umrahApplicationService.update(id, updateUmrahApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.umrahApplicationService.remove(id);
  }

  // dashboard analysis
  // api will be get-> umrah-application/api/v1/dashboard-stats
  @Get('dashboard-stats')
  getDashboardStats() {
    return this.umrahApplicationService.getDashboardStats();
  }
}
