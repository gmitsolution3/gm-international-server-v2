import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { B2bUserService } from './b2b_user.service';
import { CreateB2bUserDto } from './dto/create-b2b_user.dto';
import { UpdateB2bUserDto } from './dto/update-b2b_user.dto';

@Controller('b2b-user/api/v1')
export class B2bUserController {
  constructor(private readonly b2bUserService: B2bUserService) {}

  @Post('created')
  create(@Body() createB2bUserDto: CreateB2bUserDto) {
    return this.b2bUserService.create(createB2bUserDto);
  }

  // get api will be -> b2b-user/api/v1/find-all
  @Get('find-all')
  findAll() {
    return this.b2bUserService.findAll();
  }
  // get api will be -> b2b-user/api/v1/find-single/:id
  @Get('find-single/:id')
  findOne(@Param('id') id: string) {
    return this.b2bUserService.findOne(id);
  }

  // update api will be -> b2b-user/api/v1/upd/:id
  @Patch('upd/:id')
  update(@Param('id') id: string, @Body() updateB2bUserDto: UpdateB2bUserDto) {
    return this.b2bUserService.update(id, updateB2bUserDto);
  }

  // update api will be -> b2b-user/api/v1/del/:id
  @Delete('del/:id')
  remove(@Param('id') id: string) {
    return this.b2bUserService.remove(id);
  }

  // user B2B Dashboard

  // get api will be -> b2b-user/api/v1/get-user-dashboard
  @Get('get-user-dashboard-stats')
  GetDashboardStats() {
    return this.b2bUserService.getDashboardStats();
  }

  // get b2b student packages
  // api will be -> b2b-user/api/v1/get-std-pkg
  @Get('get-std-pkg')
  getB2BStdPkg() {
    return this.b2bUserService.getB2BStdPkg();
  }

  // get b2b tourist packages
  // api will be -> b2b-user/api/v1/get-tourist-pkg
  @Get('get-tourist-pkg')
  getB2BTouristPkg() {
    return this.b2bUserService.getB2BTouristPkg();
  }
}
