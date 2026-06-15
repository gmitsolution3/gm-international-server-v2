import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TouristPkgService } from './tourist-pkg.service';
import { CreateTouristPkgDto } from './dto/create-tourist-pkg.dto';
import { UpdateTouristPkgDto } from './dto/update-tourist-pkg.dto';

@Controller('tourist-pkg/api/v1')
export class TouristPkgController {
  constructor(private readonly touristPkgService: TouristPkgService) {}

  // api will -> be tourist-pkg/api/v1/assign
  @Post('assign')
  create(@Body() createTouristPkgDto: CreateTouristPkgDto) {
    return this.touristPkgService.create(createTouristPkgDto);
  }

  @Get()
  findAll() {
    return this.touristPkgService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.touristPkgService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTouristPkgDto: UpdateTouristPkgDto,
  ) {
    return this.touristPkgService.update(+id, updateTouristPkgDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.touristPkgService.remove(+id);
  }
}
