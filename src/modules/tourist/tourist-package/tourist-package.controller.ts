import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { TouristPackageService } from './tourist-package.service';

import { CreateTouristPackageDto } from './dto/create-tourist-package.dto';

import { UpdateTouristPackageDto } from './dto/update-tourist-package.dto';

@Controller('tourist-package/api/v1')
export class TouristPackageController {
  constructor(private readonly touristPackageService: TouristPackageService) {}

  // create tourist package
  // POST -> tourist-package/api/v1/create
  @Post('create')
  create(
    @Body()
    createTouristPackageDto: CreateTouristPackageDto,
  ) {
    return this.touristPackageService.createPackage(createTouristPackageDto);
  }

  @Get('get-home-page/pkg')
  getTouristPackages() {
    return this.touristPackageService.getTouristPackages();
  }

  // get all tourist packages
  // GET -> tourist-package/api/v1/get/all-packages
  @Get('get/all-packages')
  findAll() {
    return this.touristPackageService.getAllPackages();
  }

  // GET -> tourist-package/api/v1/get/all-packages/bd-client/
  @Get('get/all-packages/bd-client')
  findPkgForBdClient() {
    return this.touristPackageService.getAllPkgBdClient();
  }

  // GET -> tourist-package/api/v1/get/all-packages/int-client-home
  @Get('get/all-packages/int-client-home')
  getHomePkgIntClient() {
    return this.touristPackageService.getHomePkgIntClient();
  }
  // GET -> tourist-package/api/v1/get/all-packages/int-client
  @Get('get/all-packages/int-client')
  findPkgForIntClient() {
    return this.touristPackageService.getAllPkgIntClient();
  }

  // get single tourist package
  // GET -> tourist-package/api/v1/get/single-package/:id
  @Get('get/single-package/:id')
  findOne(@Param('id') id: string) {
    return this.touristPackageService.getSinglePackage(id);
  }

  // get-> tourist-package/api/v1/get/dashboard-state
  @Get('get/dashboard-state')
  analysisDashboard(){
    return this.touristPackageService.AnalysisDashboard()
  }

  // update tourist package
  // PATCH -> tourist-package/api/v1/update/:id
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body()
    updateTouristPackageDto: UpdateTouristPackageDto,
  ) {
    return this.touristPackageService.updatePackage(
      id,
      updateTouristPackageDto,
    );
  }

  // delete tourist package
  // DELETE -> tourist-package/api/v1/delete/:id
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.touristPackageService.deletePackage(id);
  }
}
