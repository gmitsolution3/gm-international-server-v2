import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TouristApplicationService } from './tourist-application.service';
import { CreateTouristApplicationDto } from './dto/create-tourist-application.dto';
import { UpdateTouristApplicationDto } from './dto/update-tourist-application.dto';
@Controller('tourist-application/api/v1')
export class TouristApplicationController {
  constructor(
    private readonly touristApplicationService: TouristApplicationService,
  ) {}

  // create application
  // POST -> tourist-application/api/v1/create
  @Post('create')
  create(
    @Body()
    createTouristApplicationDto: CreateTouristApplicationDto,
  ) {
    console.log('kick');
    return this.touristApplicationService.createApplication(
      createTouristApplicationDto,
    );
  }

  // get all applications
  // GET -> tourist-application/api/v1/get/all-applications
  @Get('get/all-applications')
  findAll() {
    return this.touristApplicationService.getAllApplications();
  }

  // get single application
  // GET -> tourist-application/api/v1/get/single-application/:id
  @Get('get/single-application/:id')
  findOne(@Param('id') id: string) {
    return this.touristApplicationService.getSingleApplication(id);
  }

  // get user application
  // GET -> tourist-application/api/v1/get-user-application?email={email}
  @Get('get-user-application')
  finUserApplication(@Query('email') email: string) {
    return this.touristApplicationService.getUserApplication(email);
  }

  // update application
  // PATCH -> tourist-application/api/v1/update/:id
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body()
    updateTouristApplicationDto: UpdateTouristApplicationDto,
  ) {
    return this.touristApplicationService.updateApplication(
      id,
      updateTouristApplicationDto,
    );
  }
  // update application
  // PATCH -> tourist-application/api/v1/update/:id
  @Put('update-single-application/:id')
  updateSingleApplication(
    @Param('id') id: string,
    @Body()
    updateTouristApplicationDto: UpdateTouristApplicationDto,
  ) {
    return this.touristApplicationService.updateApplication(
      id,
      updateTouristApplicationDto,
    );
  }

  // delete application
  // DELETE -> tourist-application/api/v1/delete/:id
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.touristApplicationService.deleteApplication(id);
  }
}
