import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { NoticeManagementService } from './notice-management.service';

import { CreateNoticeManagementDto } from './dto/create-notice-management.dto';
import { UpdateNoticeManagementDto } from './dto/update-notice-management.dto';

// apis
// post:    localhost:8080/notice-management/api/v1/create-notice
// get:     localhost:8080/notice-management/api/v1/get/all-notice
// get:     localhost:8080/notice-management/api/v1/get/notice/:id
// patch:   localhost:8080/notice-management/api/v1/upd-notice/:id
// delete:  localhost:8080/notice-management/api/v1/del-notice/:id

@Controller('notice-management/api/v1')
export class NoticeManagementController {
  constructor(
    private readonly noticeManagementService: NoticeManagementService,
  ) {}

  // CREATE NOTICE
  // api will be -> notice-management/api/v1/create-notice
  @Post('create-notice')
  create(
    @Body()
    createNoticeManagementDto: CreateNoticeManagementDto,
  ) {
    return this.noticeManagementService.createNotice(createNoticeManagementDto);
  }

  // GET ALL NOTICE
  // api will be -> notice-management/api/v1/get/all-notice
  @Get('get/all-notice')
  findAll() {
    return this.noticeManagementService.findAll();
  }

  // GET SINGLE NOTICE
  // api will be -> notice-management/api/v1/get/notice/:id
  @Get('get/notice/:id')
  findOne(@Param('id') id: string) {
    return this.noticeManagementService.findOne(id);
  }

  // api will be -> notice-management/api/v1/get-notice
  @Get('get-notice')
  async getNotice(@Query('query') query: string) {
    // Jodi query parameter optional hoy, tahole default value handle korte পারো
    return this.noticeManagementService.getNotice(query);
  }
  // UPDATE NOTICE
  // api will be -> notice-management/api/v1/upd-notice/:id
  @Patch('upd-notice/:id')
  update(
    @Param('id') id: string,
    @Body()
    updateNoticeManagementDto: UpdateNoticeManagementDto,
  ) {
    return this.noticeManagementService.update(id, updateNoticeManagementDto);
  }

  // DELETE NOTICE
  // api will be -> notice-management/api/v1/del-notice/:id
  @Delete('del-notice/:id')
  remove(@Param('id') id: string) {
    return this.noticeManagementService.remove(id);
  }
}
