import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { VideoGalleryService } from './video-gallery.service';

import { CreateVideoGalleryDto } from './dto/create-video-gallery.dto';
import { UpdateVideoGalleryDto } from './dto/update-video-gallery.dto';

// apis
// post:    localhost:8080/video-gallery/api/v1/create-video
// get:     localhost:8080/video-gallery/api/v1/get/all-video
// get:     localhost:8080/video-gallery/api/v1/get/video/:id
// patch:   localhost:8080/video-gallery/api/v1/upd-video/:id
// delete:  localhost:8080/video-gallery/api/v1/del-video/:id

@Controller('video-gallery/api/v1')
export class VideoGalleryController {
  constructor(private readonly videoGalleryService: VideoGalleryService) {}

  // CREATE VIDEO
  // api will be -> video-gallery/api/v1/create-video
  @Post('create-video')
  create(
    @Body()
    createVideoGalleryDto: CreateVideoGalleryDto,
  ) {
    return this.videoGalleryService.createVideo(createVideoGalleryDto);
  }

  // GET ALL VIDEO
  // api will be -> video-gallery/api/v1/get/all-video
  @Get('get/all-video')
  findAll() {
    return this.videoGalleryService.findAll();
  }

  // GET SINGLE VIDEO
  // api will be -> video-gallery/api/v1/get/video/:id
  @Get('get/video/:id')
  findOne(@Param('id') id: string) {
    return this.videoGalleryService.findOne(id);
  }

  // UPDATE VIDEO
  // api will be -> video-gallery/api/v1/upd-video/:id
  @Patch('upd-video/:id')
  update(
    @Param('id') id: string,
    @Body()
    updateVideoGalleryDto: UpdateVideoGalleryDto,
  ) {
    return this.videoGalleryService.update(id, updateVideoGalleryDto);
  }

  // DELETE VIDEO
  // api will be -> video-gallery/api/v1/del-video/:id
  @Delete('del-video/:id')
  remove(@Param('id') id: string) {
    return this.videoGalleryService.remove(id);
  }
}
