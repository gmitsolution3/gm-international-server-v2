import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { ImageGalleryService } from './image-gallery.service';

import { CreateImageGalleryDto } from './dto/create-image-gallery.dto';
import { UpdateImageGalleryDto } from './dto/update-image-gallery.dto';

// apis
// post:    localhost:8080/image-gallery/api/v1/create-image
// get:     localhost:8080/image-gallery/api/v1/get/all-image
// get:     localhost:8080/image-gallery/api/v1/get/image/:id
// patch:   localhost:8080/image-gallery/api/v1/upd-image/:id
// delete:  localhost:8080/image-gallery/api/v1/del-image/:id

@Controller('image-gallery/api/v1')
export class ImageGalleryController {
  constructor(private readonly imageGalleryService: ImageGalleryService) {}

  // CREATE IMAGE
  // api will be -> image-gallery/api/v1/create-image
  @Post('create-image')
  create(
    @Body()
    createImageGalleryDto: CreateImageGalleryDto,
  ) {
    return this.imageGalleryService.createImage(createImageGalleryDto);
  }

  // GET ALL IMAGE
  // api will be -> image-gallery/api/v1/get/all-image
  @Get('get/all-image')
  findAll() {
    return this.imageGalleryService.findAll();
  }

  // GET SINGLE IMAGE
  // api will be -> image-gallery/api/v1/get/image/:id
  @Get('get/image/:id')
  findOne(@Param('id') id: string) {
    return this.imageGalleryService.findOne(id);
  }

  // UPDATE IMAGE
  // api will be -> image-gallery/api/v1/upd-image/:id
  @Patch('upd-image/:id')
  update(
    @Param('id') id: string,
    @Body()
    updateImageGalleryDto: UpdateImageGalleryDto,
  ) {
    return this.imageGalleryService.update(id, updateImageGalleryDto);
  }

  // DELETE IMAGE
  // api will be -> image-gallery/api/v1/del-image/:id
  @Delete('del-image/:id')
  remove(@Param('id') id: string) {
    return this.imageGalleryService.remove(id);
  }
}
