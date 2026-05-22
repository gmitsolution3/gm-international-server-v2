import { Injectable } from '@nestjs/common';
import { CreateVideoGalleryDto } from './dto/create-video-gallery.dto';
import { UpdateVideoGalleryDto } from './dto/update-video-gallery.dto';

@Injectable()
export class VideoGalleryService {
  create(createVideoGalleryDto: CreateVideoGalleryDto) {
    return 'This action adds a new videoGallery';
  }

  findAll() {
    return `This action returns all videoGallery`;
  }

  findOne(id: number) {
    return `This action returns a #${id} videoGallery`;
  }

  update(id: number, updateVideoGalleryDto: UpdateVideoGalleryDto) {
    return `This action updates a #${id} videoGallery`;
  }

  remove(id: number) {
    return `This action removes a #${id} videoGallery`;
  }
}
