import { Module } from '@nestjs/common';
import { VideoGalleryService } from './video-gallery.service';
import { VideoGalleryController } from './video-gallery.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  VideoGallery,
  VideoGallerySchema,
} from './entities/video-gallery.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VideoGallery.name, schema: VideoGallerySchema },
    ]),
  ],
  controllers: [VideoGalleryController],
  providers: [VideoGalleryService],
})
export class VideoGalleryModule {}
