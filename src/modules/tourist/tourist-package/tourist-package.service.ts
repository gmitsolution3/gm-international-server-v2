import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { TouristPackage } from './entities/tourist-package.entity';
import { CreateTouristPackageDto } from './dto/create-tourist-package.dto';
import { UpdateTouristPackageDto } from './dto/update-tourist-package.dto';

@Injectable()
export class TouristPackageService {
  constructor(
    @InjectModel(TouristPackage.name)
    private readonly touristPackageModel: Model<TouristPackage>,
  ) {}

  // create tourist package
  async createPackage(createTouristPackageDto: CreateTouristPackageDto) {
    try {
      const data = await this.touristPackageModel.create(
        createTouristPackageDto,
      );

      return {
        success: true,
        message: 'Tourist package created successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create tourist package',
      );
    }
  }

  // get all tourist packages
  async getAllPackages() {
    try {
      const data = await this.touristPackageModel
        .find()
        .sort({ createdAt: -1 })
        .lean()
        .exec();

      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch tourist packages',
      );
    }
  }

  // get single tourist package
  async getSinglePackage(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid package id');
      }

      const data = await this.touristPackageModel.findById(id).lean().exec();

      if (!data) {
        throw new NotFoundException('Tourist package not found');
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to fetch tourist package');
    }
  }

  // update tourist package
  async updatePackage(
    id: string,
    updateTouristPackageDto: UpdateTouristPackageDto,
  ) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid package id');
      }

      const data = await this.touristPackageModel
        .findByIdAndUpdate(id, updateTouristPackageDto, {
          new: true,
        })
        .exec();

      if (!data) {
        throw new NotFoundException('Tourist package not found');
      }

      return {
        success: true,
        message: 'Tourist package updated successfully',
        data,
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Failed to update tourist package',
      );
    }
  }

  // delete tourist package
  async deletePackage(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid package id');
      }

      const data = await this.touristPackageModel.findByIdAndDelete(id);

      if (!data) {
        throw new NotFoundException('Tourist package not found');
      }

      return {
        success: true,
        message: 'Tourist package deleted successfully',
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Failed to delete tourist package',
      );
    }
  }
}
