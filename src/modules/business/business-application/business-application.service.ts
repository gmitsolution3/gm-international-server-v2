import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { UpdateBusinessApplicationDto } from './dto/update-business-application.dto';
import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';

import { BusinessApplication } from './entities/business-application.entity';
import { CreateBusinessApplicationDto } from './dto/create-business-application.dto';

@Injectable()
export class BusinessApplicationService {
  constructor(
    @InjectModel(BusinessApplication.name)
    private readonly businessApplicationModel: Model<BusinessApplication>,
  ) {}

  // create application
  async appliedApplication(
    createBusinessApplicationDto: CreateBusinessApplicationDto,
  ) {
    try {
      const data = await this.businessApplicationModel.create(
        createBusinessApplicationDto,
      );

      return {
        success: true,
        message: 'Business application submitted successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to submit business application',
      );
    }
  }

  // get all applications
  async getAllApplication() {
    try {
      const data = await this.businessApplicationModel.find().lean().exec();

      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch business applications',
      );
    }
  }

  // get single application
  async getSingleApplication(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid application id');
      }

      const data = await this.businessApplicationModel
        .findById(id)
        .lean()
        .exec();

      if (!data) {
        throw new NotFoundException('Application not found');
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
        'Failed to fetch business application',
      );
    }
  }

  // update application
  async updateBusinessApp(
    id: string,
    updateBusinessApplicationDto: UpdateBusinessApplicationDto,
  ) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid application id');
      }

      const data = await this.businessApplicationModel
        .findByIdAndUpdate(id, updateBusinessApplicationDto, {
          new: true,
        })
        .exec();

      if (!data) {
        throw new NotFoundException('Application not found');
      }

      return {
        success: true,
        message: 'Business application updated successfully',
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
        'Failed to update business application',
      );
    }
  }

  // delete application
  async deleteBusinessApp(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid application id');
      }

      const data = await this.businessApplicationModel.findByIdAndDelete(id);

      if (!data) {
        throw new NotFoundException('Application not found');
      }

      return {
        success: true,
        message: 'Business application deleted successfully',
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Failed to delete business application',
      );
    }
  }
}
