import { Module } from '@nestjs/common';
import { ImageGalleryService } from './image-gallery.service';
import { ImageGalleryController } from './image-gallery.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ImageGallery,
  ImageGallerySchema,
} from './entities/image-gallery.entity';
import {
  VideoGallery,
  VideoGallerySchema,
} from '../video-gallery/entities/video-gallery.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ImageGallery.name, schema: ImageGallerySchema },
      { name: VideoGallery.name, schema: VideoGallerySchema },
    ]),
  ],
  controllers: [ImageGalleryController],
  providers: [ImageGalleryService],
})
export class ImageGalleryModule {}
