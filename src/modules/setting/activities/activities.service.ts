import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ImageGallery } from './image-gallery/entities/image-gallery.entity';
import { VideoGallery } from './video-gallery/entities/video-gallery.entity';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectModel(ImageGallery.name)
    private readonly imageGalleryModel: Model<ImageGallery>,

    @InjectModel(VideoGallery.name)
    private readonly videoGalleryModel: Model<VideoGallery>,
  ) {}

  // GET DASHBOARD DATA
  async getDashboardData() {
    try {
      const [resultVideo, resultGallery] = await Promise.all([
        this.videoGalleryModel.find().sort({ createdAt: -1 }).exec(),

        this.imageGalleryModel.find().sort({ createdAt: -1 }).exec(),
      ]);

      return {
        success: true,
        message: 'Activities dashboard data fetched successfully',
        data: {
          resultVideo,
          resultGallery,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch dashboard data');
    }
  }
}
