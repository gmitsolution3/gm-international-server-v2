import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VideoGalleryService } from './video-gallery.service';
import { CreateVideoGalleryDto } from './dto/create-video-gallery.dto';
import { UpdateVideoGalleryDto } from './dto/update-video-gallery.dto';

@Controller('video-gallery')
export class VideoGalleryController {
  constructor(private readonly videoGalleryService: VideoGalleryService) {}

  @Post()
  create(@Body() createVideoGalleryDto: CreateVideoGalleryDto) {
    return this.videoGalleryService.create(createVideoGalleryDto);
  }

  @Get()
  findAll() {
    return this.videoGalleryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoGalleryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoGalleryDto: UpdateVideoGalleryDto) {
    return this.videoGalleryService.update(+id, updateVideoGalleryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoGalleryService.remove(+id);
  }
}
