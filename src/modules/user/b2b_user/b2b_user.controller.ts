import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { B2bUserService } from './b2b_user.service';
import { CreateB2bUserDto } from './dto/create-b2b_user.dto';
import { UpdateB2bUserDto } from './dto/update-b2b_user.dto';

@Controller('b2b-user')
export class B2bUserController {
  constructor(private readonly b2bUserService: B2bUserService) {}

  @Post()
  create(@Body() createB2bUserDto: CreateB2bUserDto) {
    return this.b2bUserService.create(createB2bUserDto);
  }

  @Get()
  findAll() {
    return this.b2bUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.b2bUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateB2bUserDto: UpdateB2bUserDto) {
    return this.b2bUserService.update(+id, updateB2bUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.b2bUserService.remove(+id);
  }
}
