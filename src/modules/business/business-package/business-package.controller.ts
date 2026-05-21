import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { BusinessPackageService } from './business-package.service';

import { CreateBusinessPackageDto } from './dto/create-business-package.dto';

import { UpdateBusinessPackageDto } from './dto/update-business-package.dto';

@Controller('business-package/api/v1')
export class BusinessPackageController {
  constructor(
    private readonly businessPackageService: BusinessPackageService,
  ) {}

  // create package
  // POST -> business-package/api/v1/create
  @Post('create')
  create(
    @Body()
    createBusinessPackageDto: CreateBusinessPackageDto,
  ) {
    return this.businessPackageService.createPackage(createBusinessPackageDto);
  }

  // get all packages
  // GET -> business-package/api/v1/get/all-packages
  @Get('get/all-packages')
  findAll() {
    return this.businessPackageService.getAllPackages();
  }

  // get single package
  // GET -> business-package/api/v1/get/single-package/:id
  @Get('get/single-package/:id')
  findOne(@Param('id') id: string) {
    return this.businessPackageService.getSinglePackage(id);
  }

  // update package
  // PATCH -> business-package/api/v1/update/:id
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body()
    updateBusinessPackageDto: UpdateBusinessPackageDto,
  ) {
    return this.businessPackageService.updatePackage(
      id,
      updateBusinessPackageDto,
    );
  }

  // delete package
  // DELETE -> business-package/api/v1/delete/:id
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.businessPackageService.deletePackage(id);
  }
}
