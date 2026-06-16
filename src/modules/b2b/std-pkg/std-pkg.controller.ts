import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StdPkgService } from './std-pkg.service';
import { CreateStdPkgDto } from './dto/create-std-pkg.dto';
import { UpdateStdPkgDto } from './dto/update-std-pkg.dto';

@Controller('std-pkg/api/v1')
export class StdPkgController {
  constructor(private readonly stdPkgService: StdPkgService) {}

  // post api will be -> std-pkg/api/v1/create
  @Post('create')
  create(@Body() createStdPkgDto: CreateStdPkgDto) {
    console.log('click');
    return this.stdPkgService.create(createStdPkgDto);
  }

  // api will be ->std-pkg/api/v1/find-b2b-all-pkg
  @Get('find-b2b-all-pkg')
  findAll() {
    return this.stdPkgService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stdPkgService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStdPkgDto: UpdateStdPkgDto) {
    return this.stdPkgService.update(+id, updateStdPkgDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stdPkgService.remove(+id);
  }
}
