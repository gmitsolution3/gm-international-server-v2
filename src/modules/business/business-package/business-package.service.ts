import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';

import { BusinessPackage } from './entities/business-package.entity';

import { CreateBusinessPackageDto } from './dto/create-business-package.dto';

import { UpdateBusinessPackageDto } from './dto/update-business-package.dto';

@Injectable()
export class BusinessPackageService {
  constructor(
    @InjectModel(BusinessPackage.name)
    private readonly businessPackageModel: Model<BusinessPackage>,
  ) {}

  // create package
  async createPackage(createBusinessPackageDto: CreateBusinessPackageDto) {
    try {
      const data = await this.businessPackageModel.create(
        createBusinessPackageDto,
      );

      return {
        success: true,
        message: 'Business package created successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create business package',
      );
    }
  }

  // get all packages
  async getAllPackages() {
    try {
      const data = await this.businessPackageModel
        .find({ packageStatus: 'active', isWithVisaAndAirTicket: true })
        .sort({ createdAt: -1 })
        .lean()
        .exec();

      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch business packages',
      );
    }
  }

  async findHomePackage() {
    try {
      const query = { packageStatus: 'active', isWithVisaAndAirTicket: true };
      const data = await this.businessPackageModel
        .find(query)
        .sort({ createdAt: -1 })
        .limit(3)
        .lean()
        .exec();

      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch business packages',
      );
    }
  }
  async withoutVisaPkg() {
    try {
      const query = { packageStatus: 'active', isWithVisaAndAirTicket: false };
      const data = await this.businessPackageModel
        .find(query)
        .sort({ createdAt: -1 })
        .limit(3)
        .lean()
        .exec();

      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch business packages',
      );
    }
  }
  async withoutVisaAllPkg() {
    try {
      const query = { packageStatus: 'active', isWithVisaAndAirTicket: false };
      const data = await this.businessPackageModel
        .find(query)
        .sort({ createdAt: -1 })
        .lean()
        .exec();

      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch business packages',
      );
    }
  }

  // get single package
  async getSinglePackage(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid package id');
      }

      const data = await this.businessPackageModel.findById(id).lean().exec();

      if (!data) {
        throw new NotFoundException('Business package not found');
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

      throw new InternalServerErrorException(
        'Failed to fetch business package',
      );
    }
  }

  // update package
  async updatePackage(
    id: string,
    updateBusinessPackageDto: UpdateBusinessPackageDto,
  ) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid package id');
      }

      const data = await this.businessPackageModel
        .findByIdAndUpdate(id, updateBusinessPackageDto, {
          new: true,
        })
        .exec();

      if (!data) {
        throw new NotFoundException('Business package not found');
      }

      return {
        success: true,
        message: 'Business package updated successfully',
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
        'Failed to update business package',
      );
    }
  }

  // delete package
  async deletePackage(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid package id');
      }

      const data = await this.businessPackageModel.findByIdAndDelete(id);

      if (!data) {
        throw new NotFoundException('Business package not found');
      }

      return {
        success: true,
        message: 'Business package deleted successfully',
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Failed to delete business package',
      );
    }
  }

  // get b2b business package
  async getB2BBusinessPkg() {
    try {
      const data = await this.businessPackageModel
        .find()
        .select({ hotelName: 0, hotelRating: 0, description: 0, photo: 0 })
        .lean()
        .exec();
      return { success: true, message: 'find b2b pkg', data };
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
}
