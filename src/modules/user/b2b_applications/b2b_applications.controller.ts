import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { B2bApplicationsService } from './b2b_applications.service';
import { UpdateB2bApplicationDto } from './dto/update-b2b_application.dto';
import { CreateB2BApplicationDto } from './dto/create-b2b_application.dto';

@Controller('b2b-applications/api/v1')
export class B2bApplicationsController {
  constructor(
    private readonly b2bApplicationsService: B2bApplicationsService,
  ) {}

  // post api-> b2b-applications/api/v1/create
  @Post('create')
  create(@Body() createB2bApplicationDto: CreateB2BApplicationDto) {
    return this.b2bApplicationsService.create(createB2bApplicationDto);
  }

  // get api-> b2b-applications/api/v1/get-all
  @Get('get-all')
  findAll() {
    return this.b2bApplicationsService.findAll();
  }

  // get api-> b2b-applications/api/v1/get-single
  @Get('get-single/:id')
  findOne(@Param('id') id: string) {
    return this.b2bApplicationsService.findOne(id);
  }

  // update api-> b2b-applications/api/v1/upd/id
  @Patch('upd/:id')
  update(
    @Param('id') id: string,
    @Body() updateB2bApplicationDto: UpdateB2bApplicationDto,
  ) {
    return this.b2bApplicationsService.update(id, updateB2bApplicationDto);
  }

  // del api-> b2b-applications/api/v1/del/id
  @Delete('del/:id')
  remove(@Param('id') id: string) {
    return this.b2bApplicationsService.remove(id);
  }
}
