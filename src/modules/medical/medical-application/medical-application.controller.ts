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
import { MedicalApplicationService } from './medical-application.service';
import {
  CreateMedicalApplicationDto,
  UpdatePaymentDto,
} from './dto/create-medical-application.dto';
import { UpdateMedicalApplicationDto } from './dto/update-medical-application.dto';

// api list
//create-> localhost:8080/medical-application/api/v1/create
//get all-> localhost:8080/medical-application/api/v1/get-all
//get user application-> localhost:8080/medical-application/api/v1/get-user-application/:email
//get single-> localhost:8080/medical-application/api/v1/get-single/:id
//patch update-> localhost:8080/medical-application/api/v1/upd-application/:id
//delete-> localhost:8080/medical-application/api/v1/delete-application/:id

@Controller('medical-application/api/v1')
export class MedicalApplicationController {
  constructor(
    private readonly medicalApplicationService: MedicalApplicationService,
  ) {}

  @Post('create')
  create(@Body() createMedicalApplicationDto: CreateMedicalApplicationDto) {
    return this.medicalApplicationService.create(createMedicalApplicationDto);
  }

  // get-> medical-application/api/v1/get-all
  @Get('get-all')
  findAll() {
    return this.medicalApplicationService.findAll();
  }

  // get-> medical-application/api/v1/get-single/:id
  @Get('get-single/:id')
  findOne(@Param('id') id: string) {
    return this.medicalApplicationService.findOne(id);
  }
  @Get('get-user-application/:email')
  findUserApplication(@Param('email') email: string) {
    return this.medicalApplicationService.findUserApplication(email);
  }

  // the api will be -> medical-application/api/v1/dashboard-stats
  @Get('dashboard-stats')
  getDashboardStats() {
    return this.medicalApplicationService.getDashboardStats();
  }

  // the api will be -> medical-application/api/v1/user-dashboard-stats
  @Get('user-dashboard-stats')
  getUserDashboardStats(@Query('email') email: string) {
    return this.medicalApplicationService.getUserDashboardStats(email);
  }

  // the api will be -> medical-application/api/v1/upd-application/:id
  @Patch('upd-application/:id')
  update(
    @Param('id') id: string,
    @Body() updateMedicalApplicationDto: UpdateMedicalApplicationDto,
  ) {
    return this.medicalApplicationService.update(
      id,
      updateMedicalApplicationDto,
    );
  }

  // the api will be -> medical-application/api/v1/upd-appointment/payment
  @Patch('upd-appointment/payment/:id')
  updatePayment(@Param('id') id: string, @Body() updateData: UpdatePaymentDto) {
    return this.medicalApplicationService.updatePaymentStatus(id, updateData);
  }
  @Delete('delete-application/:id')
  remove(@Param('id') id: string) {
    return this.medicalApplicationService.remove(id);
  }
}
