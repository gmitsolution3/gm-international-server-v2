import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';

import { AboutService } from './about.service';

import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';

// apis
// post:    localhost:8080/about-team/api/v1/create-team-member
// get:     localhost:8080/about-team/api/v1/get/all-team-member
// get:     localhost:8080/about-team/api/v1/get/about/:id
// patch:   localhost:8080/about-team/api/v1/upd-about/:id
// delete:  localhost:8080/about-team/api/v1/del-about/:id

@Controller('about-team/api/v1')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  // CREATE ABOUT
  // api will be -> about-team/api/v1/create-team-member
  @Post('create-team-member')
  create(
    @Body()
    createAboutDto: CreateAboutDto,
  ) {
    return this.aboutService.createAbout(createAboutDto);
  }

  // GET ALL ABOUT
  // api will be -> about-team/api/v1/get/all-team-member
  @Get('get/all-team-member')
  findAll() {
    return this.aboutService.findAll();
  }

  // GET SINGLE ABOUT
  // api will be -> about/api/v1/get/about/:id
  @Get('get/about/:id')
  findOne(@Param('id') id: string) {
    return this.aboutService.findOne(id);
  }

  // UPDATE ABOUT
  // api will be -> about-team/api/v1/upd-about/:id
  @Put('upd-about/:id')
  update(
    @Param('id') id: string,
    @Body()
    updateAboutDto: UpdateAboutDto,
  ) {
    return this.aboutService.update(id, updateAboutDto);
  }

  // DELETE ABOUT
  // api will be -> about-team/api/v1/del-about/:id
  @Delete('del-about/:id')
  remove(@Param('id') id: string) {
    return this.aboutService.remove(id);
  }
}
