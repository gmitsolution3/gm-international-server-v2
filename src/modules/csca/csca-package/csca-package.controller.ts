import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CscaPackageService } from './csca-package.service';
import { CreateCscaPackageDto } from './dto/create-csca-package.dto';
import { UpdateCscaPackageDto } from './dto/update-csca-package.dto';

@Controller('csca-package')
export class CscaPackageController {
  constructor(private readonly cscaPackageService: CscaPackageService) {}

  @Post()
  create(@Body() createCscaPackageDto: CreateCscaPackageDto) {
    return this.cscaPackageService.create(createCscaPackageDto);
  }

  @Get()
  findAll() {
    return this.cscaPackageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cscaPackageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCscaPackageDto: UpdateCscaPackageDto) {
    return this.cscaPackageService.update(+id, updateCscaPackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cscaPackageService.remove(+id);
  }
}
