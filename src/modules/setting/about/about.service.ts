import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { About } from './entities/about.entity';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';

@Injectable()
export class AboutService {
  constructor(
    @InjectModel(About.name)
    private readonly aboutModel: Model<About>,
  ) {}

  async createAbout(createAboutDto: CreateAboutDto) {
    try {
      const data = await this.aboutModel.create(createAboutDto);

      return {
        success: true,
        message: 'About created successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create about');
    }
  }

  async findAll() {
    try {
      const data = await this.aboutModel.find().exec();

      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch about data');
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.aboutModel.findById(id).exec();

      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch about data');
    }
  }

  async update(id: string, updateAboutDto: UpdateAboutDto) {
    try {
      const data = await this.aboutModel
        .findByIdAndUpdate(id, updateAboutDto, {
          new: true,
        })
        .exec();

      return {
        success: true,
        message: 'About updated successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update about');
    }
  }

  async remove(id: string) {
    try {
      await this.aboutModel.findByIdAndDelete(id).exec();

      return {
        success: true,
        message: 'About deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete about');
    }
  }
}
