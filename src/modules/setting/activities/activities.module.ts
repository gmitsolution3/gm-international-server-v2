// import { Module } from '@nestjs/common';
// import { ImageGalleryModule } from './image-gallery/image-gallery.module';
// import { VideoGalleryModule } from './video-gallery/video-gallery.module';

// @Module({
//   imports: [ImageGalleryModule, VideoGalleryModule],
// })
// export class ActivitiesModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ImageGalleryModule } from './image-gallery/image-gallery.module';
import { VideoGalleryModule } from './video-gallery/video-gallery.module';
import {
  ImageGallery,
  ImageGallerySchema,
} from './image-gallery/entities/image-gallery.entity';
import {
  VideoGallery,
  VideoGallerySchema,
} from './video-gallery/entities/video-gallery.entity';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';

@Module({
  imports: [
    ImageGalleryModule,
    VideoGalleryModule,

    MongooseModule.forFeature([
      {
        name: ImageGallery.name,
        schema: ImageGallerySchema,
      },
      {
        name: VideoGallery.name,
        schema: VideoGallerySchema,
      },
    ]),
  ],

  controllers: [ActivitiesController],
  providers: [ActivitiesService],
})
export class ActivitiesModule {}
