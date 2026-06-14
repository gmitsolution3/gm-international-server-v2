import {
  Controller,
  Get,
  HttpStatus,
  HttpException,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ScholarshipPackageService } from './scholarship-package.service';
import { ScholarshipPackage } from '../scholarship.schema';

// total apis:
// post: //localhost:8080/scholarship-package/api/v1/create-pkg
// get: //localhost:8080/scholarship-package/api/v1/get/available-pkg
// get: //localhost:8080/scholarship-package/api/v1/get-home/scholarship-pkg
// get: //localhost:8080/scholarship-package/api/v1/pkg-details/:id
// get: //localhost:8080/scholarship-package/api/v1/get-scholarship-filtered
// patch: //localhost:8080/scholarship-package/api/v1/upd-pkg/6a0d8cc86aa034e7fa7696f7
// put:localhost:8080/scholarship-package/api/v1/upd-whole-pkg/6a0d8d4dd79f8b17255fee3a
// delete: //localhost:8080/scholarship-package/api/v1/dlt-pkg/6a0d8d4dd79f8b17255fee3a

@Controller('scholarship-package/api/v1')
export class ScholarshipPackageController {
  constructor(
    private readonly scholarshipPackageService: ScholarshipPackageService,
  ) {}

  // get-api-> scholarship-package/api/v1/get/available-pkg
  @Get('get/available-pkg')
  async getScholarshipPackageManagement() {
    return await this.scholarshipPackageService.getScholarshipPackageManagement();
  }

  @Get('get-home/scholarship-pkg')
  async getHomePagePkg() {
    return await this.scholarshipPackageService.getScholarshipHomePagePkg();
  }

  // details-api-> scholarship-package/api/v1/pkg-details/:id
  @Get('pkg-details/:id')
  async getScholarShipPkgDetails(@Param('id') id: string) {
    return await this.scholarshipPackageService.getScholarshipPkgDetails(id);
  }
  // create-api-> scholarship-package/api/v1/create-pkg
  @Post('create-pkg')
  async CreateScholarshipPkg(@Body() body: ScholarshipPackage) {
    try {
      const result =
        await this.scholarshipPackageService.createScholarshipPackage(body);
      return result;
    } catch (err) {
      console.error('Error fetching scholarship package data:', err);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // patch update api => scholarship-package/api/v1/upd-pkg/id
  @Patch('upd-pkg/:id')
  async updateScholarshipPackage(@Param('id') id: string, @Body() body: any) {
    const { _id, ...payload } = body;
    return await this.scholarshipPackageService.updateScholarshipPackage(
      id,
      payload,
    );
  }

  @Put('upd-whole-pkg/:id')
  async updateWholePackage(@Param('id') id: string, @Body() body: any) {
    const { _id, ...payload } = body;
    return await this.scholarshipPackageService.updateScholarshipPackage(
      id,
      payload,
    );
  }

  // patch update api => scholarship-package/api/v1/dlt-pkg/id
  @Delete('dlt-pkg/:id')
  async deleteScholarshipPackage(@Param('id') id: string) {
    return await this.scholarshipPackageService.deleteScholarshipPackage(id);
  }

  @Get('get-scholarship-filtered')
  async getScholarshipFiltered() {
    return await this.scholarshipPackageService.searchQueryData();
  }

  // get international package
  // scholarship-package/api/v1/get-international-home-pkg
  @Get('get-international-home-pkg')
  async getInternationalHomePkg() {
    return await this.scholarshipPackageService.getInternationalHomeStudentPackage();
  }

  // scholarship-package/api/v1/get-international-all-pkg
  @Get('get-international-all-pkg')
  async getInternationalAllPkg() {
    return await this.scholarshipPackageService.getInternationalAllPackage();
  }
}
