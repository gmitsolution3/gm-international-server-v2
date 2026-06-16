import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ImageGallery } from './entities/image-gallery.entity';

import { CreateImageGalleryDto } from './dto/create-image-gallery.dto';
import { UpdateImageGalleryDto } from './dto/update-image-gallery.dto';
import { VideoGallery } from '../video-gallery/entities/video-gallery.entity';

@Injectable()
export class ImageGalleryService {
  constructor(
    @InjectModel(ImageGallery.name)
    private readonly imageGalleryModel: Model<ImageGallery>,

    @InjectModel(VideoGallery.name)
    private readonly videoGalleryModel: Model<VideoGallery>,
  ) {}

  async createImage(createImageGalleryDtos: CreateImageGalleryDto[]) {
    const data = await this.imageGalleryModel.insertMany(
      createImageGalleryDtos,
    );

    return {
      success: true,
      data,
    };
  }

  async findAll() {
    try {
      const data = await this.imageGalleryModel.find().exec();

      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch images');
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.imageGalleryModel.findById(id).exec();

      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch image');
    }
  }

  async update(id: string, updateImageGalleryDto: UpdateImageGalleryDto) {
    try {
      const data = await this.imageGalleryModel
        .findByIdAndUpdate(id, updateImageGalleryDto, {
          new: true,
        })
        .exec();

      return {
        success: true,
        message: 'Image updated successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update image');
    }
  }

  async remove(ids: string[]) {
    try {
      const result = await this.imageGalleryModel.deleteMany({
        _id: { $in: ids },
      });
      return {
        success: true,
        message: 'Image deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete image');
    }
  }

  async mediaActivities() {
    const [videos, gallery] = await Promise.all([
      this.videoGalleryModel.find({}).sort({ createdAt: -1 }).lean().exec(),
      this.imageGalleryModel.find({}).sort({ createdAt: -1 }).lean().exec(),
    ]);

    return {
      success: true,
      message: 'Data found',
      data: { resultVideo: videos, resultGallery: gallery },
    };
  }
}
