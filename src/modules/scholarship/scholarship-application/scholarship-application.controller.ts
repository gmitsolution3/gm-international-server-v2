import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { ScholarshipApplicationService } from './scholarship-application.service';

//get-all: localhost:8080/scholarship-application/api/v1/get/all-applications;
//get-single: localhost:8080/scholarship-application/api/v1/get/application/:id;
//post: localhost:8080/scholarship-application/api/v1/create-application;
//patch: localhost:8080/scholarship-application/api/v1/get/upd-application/:id;
//put: localhost:8080/scholarship-application/api/v1/get/upd-whole-application/:id;
//delete: localhost:8080/scholarship-application/api/v1/delete/application/:id;
//get: localhost:8080/scholarship-application/api/v1/get/user/application/:email;

@Controller('scholarship-application/api/v1')
export class ScholarshipApplicationController {
  constructor(
    private readonly scholarshipApplicationService: ScholarshipApplicationService,
  ) {}

  // api will be -> scholarship-application/api/v1/get/all-applications
  // GET ALL
  @Get('get/all-applications')
  async getAllApplications() {
    return await this.scholarshipApplicationService.getAllApplications();
  }

  // GET SINGLE
  // api will be -> scholarship-application/api/v1/get/application/id
  @Get('get/application/:id')
  async getSingleApplication(@Param('id') id: string) {
    return await this.scholarshipApplicationService.getSingleApplication(id);
  }

  // GET USER Application
  // api will be -> scholarship-application/api/v1/get/user/application/:email
  @Get('get/user/application/:email')
  async getUserApplication(@Param('email') email: string) {
    return await this.scholarshipApplicationService.getUserApplication(email);
  }

  // CREATE
  // api will be -> scholarship-application/api/v1/create-application
  @Post('create-application')
  async createApplication(@Body() body: any) {
    return await this.scholarshipApplicationService.createApplication(body);
  }

  // PATCH UPDATE
  // api will be -> scholarship-application/api/v1/upd-application/id
  @Patch('upd-application/:id')
  async patchApplication(@Param('id') id: string, @Body() body: any) {
    return await this.scholarshipApplicationService.patchApplication(id, body);
  }

  // PUT UPDATE
  // api will be -> scholarship-application/api/v1/get/upd-whole-application/id
  @Put('upd-whole-application/:id')
  async putApplication(@Param('id') id: string, @Body() body: any) {
    return await this.scholarshipApplicationService.putApplication(id, body);
  }

  // DELETE
  // api will be -> scholarship-application/api/v1/get/delete/application/id
  @Delete('delete/application/:id')
  async deleteApplication(@Param('id') id: string) {
    return await this.scholarshipApplicationService.deleteApplication(id);
  }

  // admin dashboard stats
  // api will be -> get-> scholarship-application/api/v1/get-dashboard-stats
  @Get('get-dashboard-stats')
  async getDashboardStats() {
    return await this.scholarshipApplicationService.getAdminDashboardStats();
  }
}
