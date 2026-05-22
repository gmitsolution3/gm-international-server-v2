import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OfficeAddressService } from './office-address.service';
import { CreateOfficeAddressDto } from './dto/create-office-address.dto';
import { UpdateOfficeAddressDto } from './dto/update-office-address.dto';

// apis
// post:    localhost:8080/office-address/api/v1/create-office-address
// get:     localhost:8080/office-address/api/v1/get/all-office-address
// get:     localhost:8080/office-address/api/v1/get/office-address/:id
// patch:   localhost:8080/office-address/api/v1/upd-office-address/:id
// delete:  localhost:8080/office-address/api/v1/del-office-address/:id

@Controller('office-address/api/v1')
export class OfficeAddressController {
  constructor(private readonly officeAddressService: OfficeAddressService) {}

  // CREATE OFFICE ADDRESS
  // api will be -> office-address/api/v1/create-office-address
  @Post('create-office-address')
  create(@Body() createOfficeAddressDto: CreateOfficeAddressDto) {
    return this.officeAddressService.createOfficeAddress(
      createOfficeAddressDto,
    );
  }

  // GET ALL OFFICE ADDRESS
  // api will be -> office-address/api/v1/get/all-office-address
  @Get('get/all-office-address')
  findAll() {
    return this.officeAddressService.findAll();
  }

  // GET SINGLE OFFICE ADDRESS
  // api will be -> office-address/api/v1/get/office-address/:id
  @Get('get/office-address/:id')
  findOne(@Param('id') id: string) {
    return this.officeAddressService.findOne(id);
  }

  // UPDATE OFFICE ADDRESS
  // api will be -> office-address/api/v1/upd-office-address/:id
  @Patch('upd-office-address/:id')
  update(
    @Param('id') id: string,
    @Body() updateOfficeAddressDto: UpdateOfficeAddressDto,
  ) {
    return this.officeAddressService.update(id, updateOfficeAddressDto);
  }

  // DELETE OFFICE ADDRESS
  // api will be -> office-address/api/v1/del-office-address/:id
  @Delete('del-office-address/:id')
  remove(@Param('id') id: string) {
    return this.officeAddressService.remove(id);
  }
}
