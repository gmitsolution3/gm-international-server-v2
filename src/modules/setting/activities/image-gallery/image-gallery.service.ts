import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ImageGallery } from './entities/image-gallery.entity';

import { CreateImageGalleryDto } from './dto/create-image-gallery.dto';
import { UpdateImageGalleryDto } from './dto/update-image-gallery.dto';

@Injectable()
export class ImageGalleryService {
  constructor(
    @InjectModel(ImageGallery.name)
    private readonly imageGalleryModel: Model<ImageGallery>,
  ) {}

  async createImage(createImageGalleryDto: CreateImageGalleryDto) {
    try {
      const data = await this.imageGalleryModel.create(createImageGalleryDto);
      return {
        success: true,
        message: 'Image created successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create image');
    }
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

  async remove(id: string) {
    try {
      await this.imageGalleryModel.findByIdAndDelete(id).exec();

      return {
        success: true,
        message: 'Image deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete image');
    }
  }
}
