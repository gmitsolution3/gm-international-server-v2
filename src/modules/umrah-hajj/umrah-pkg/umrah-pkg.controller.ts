import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UmrahService } from './umrah-pkg.service';
import { CreateUmrahHajjPackageDto } from './dto/create-umrah-pkg.dto';
import { UpdateUmrahPkgDto } from './dto/update-umrah-pkg.dto';

@Controller('umrah/api/v1')
export class UmrahController {
  constructor(private readonly umrahService: UmrahService) {}

  //api will be POst-> umrah/api/v1/create-pkg
  @Post('create-pkg')
  create(@Body() createUmrahDto: CreateUmrahHajjPackageDto) {
    return this.umrahService.create(createUmrahDto);
  }

  // get -> umrah/api/v1/get-all-pkg
  @Get('get-all-pkg')
  findAll() {
    return this.umrahService.findAll();
  }

  // get -> umrah/api/v1/get-home-pkg
  @Get('get-home-pkg')
  homePkg() {
    return this.umrahService.findHomePkg();
  }

  // get-> umrah/api/v1/get-single-pkg/:id
  @Get('get-single-pkg/:id')
  findOne(@Param('id') id: string) {
    return this.umrahService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUmrahDto: UpdateUmrahPkgDto) {
    return this.umrahService.update(+id, updateUmrahDto);
  }

  //api will be del-> umrah/api/v1/del-pkg
  @Delete('del-pkg/:id')
  remove(@Param('id') id: string) {
    return this.umrahService.remove(id);
  }
}
