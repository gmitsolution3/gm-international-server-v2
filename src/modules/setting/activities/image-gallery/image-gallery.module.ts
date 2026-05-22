import { Module } from '@nestjs/common';
import { ImageGalleryService } from './image-gallery.service';
import { ImageGalleryController } from './image-gallery.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ImageGallery,
  ImageGallerySchema,
} from './entities/image-gallery.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ImageGallery.name, schema: ImageGallerySchema },
    ]),
  ],
  controllers: [ImageGalleryController],
  providers: [ImageGalleryService],
})
export class ImageGalleryModule {}
