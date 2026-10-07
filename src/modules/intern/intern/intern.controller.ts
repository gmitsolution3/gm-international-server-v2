import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InternProfileService } from './intern.service';
import { CreateInternProfileDto } from './dto/create-intern.dto';

@Controller('api/v1/intern/profile')
export class InternProfileController {
  // Injecting the InternProfileService into the controller constructor
  constructor(private readonly internProfileService: InternProfileService) {}

  // api will be- > /api/v1/intern/profile/create
  @Post('create')
  async createProfile(@Body() createDto: CreateInternProfileDto) {
    return await this.internProfileService.create(createDto);
  }
  //  api will be -> /api/v1/intern/profile/get-all-profile
  @Get('get-all-profile')
  async getAllProfiles() {
    return await this.internProfileService.findAll();
  }

  // api will be -> /api/v1/intern/profile/get-profile-details/:id
  @Get('get-profile-details/:id')
  async getProfileDetails(@Param('id') id: string) {
    return await this.internProfileService.findOne(id);
  }

  // api will be -> /api/v1/intern/profile/upd-profile/:id
  @Patch('upd-profile/:id')
  async updateProfile(
    @Param('id') id: string,
    @Body() updateDto: Partial<CreateInternProfileDto>,
  ) {
    return await this.internProfileService.update(id, updateDto);
  }

  // api will be-> /api/v1/intern/profile/del-profile/:id
  @Delete('del-profile/:id')
  async deleteProfile(@Param('id') id: string) {
    return await this.internProfileService.remove(id);
  }

  // dashboard/analytics
  // api will be-> /api/v1/intern/profile/analytics
  @Get('/analytics')
  async dashboardAnalytics() {
    return await this.internProfileService.dashboardAnalytics();
  }
}
