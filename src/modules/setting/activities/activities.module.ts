import { Module } from '@nestjs/common';
import { ImageGalleryModule } from './image-gallery/image-gallery.module';
import { VideoGalleryModule } from './video-gallery/video-gallery.module';

@Module({
  imports: [ImageGalleryModule, VideoGalleryModule],
})
export class ActivitiesModule {}
