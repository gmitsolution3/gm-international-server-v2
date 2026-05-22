import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { VideoGallery } from './entities/video-gallery.entity';

import { CreateVideoGalleryDto } from './dto/create-video-gallery.dto';
import { UpdateVideoGalleryDto } from './dto/update-video-gallery.dto';

@Injectable()
export class VideoGalleryService {
  constructor(
    @InjectModel(VideoGallery.name)
    private readonly videoGalleryModel: Model<VideoGallery>,
  ) {}

  async createVideo(createVideoGalleryDto: CreateVideoGalleryDto) {
    try {
      const data = await this.videoGalleryModel.create(createVideoGalleryDto);

      return {
        success: true,
        message: 'Video created successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create video');
    }
  }

  async findAll() {
    try {
      const data = await this.videoGalleryModel.find().exec();

      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch videos');
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.videoGalleryModel.findById(id).exec();

      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch video');
    }
  }

  async update(id: string, updateVideoGalleryDto: UpdateVideoGalleryDto) {
    try {
      const data = await this.videoGalleryModel
        .findByIdAndUpdate(id, updateVideoGalleryDto, {
          new: true,
        })
        .exec();

      return {
        success: true,
        message: 'Video updated successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update video');
    }
  }

  async remove(id: string) {
    try {
      await this.videoGalleryModel.findByIdAndDelete(id).exec();

      return {
        success: true,
        message: 'Video deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete video');
    }
  }
}
