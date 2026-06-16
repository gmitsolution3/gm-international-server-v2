import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessPkgService } from './business-pkg.service';
import { CreateBusinessPkgDto } from './dto/create-business-pkg.dto';
import { UpdateBusinessPkgDto } from './dto/update-business-pkg.dto';

@Controller('b2b/business-pkg/api/v1')
export class BusinessPkgController {
  constructor(private readonly businessPkgService: BusinessPkgService) {}

  // api will be -> b2b/business-pkg/api/v1/create
  @Post('create')
  create(@Body() createBusinessPkgDto: CreateBusinessPkgDto) {
    return this.businessPkgService.create(createBusinessPkgDto);
  }

  // api will be -> b2b/business-pkg/api/v1/get-all-pkg
  @Get('get-all-pkg')
  findAll() {
    return this.businessPkgService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessPkgService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBusinessPkgDto: UpdateBusinessPkgDto,
  ) {
    return this.businessPkgService.update(+id, updateBusinessPkgDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessPkgService.remove(+id);
  }
}
