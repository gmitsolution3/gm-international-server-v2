import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';

import { TouristApplication } from './entities/tourist-application.entity';

import { CreateTouristApplicationDto } from './dto/create-tourist-application.dto';

import { UpdateTouristApplicationDto } from './dto/update-tourist-application.dto';

@Injectable()
export class TouristApplicationService {
  constructor(
    @InjectModel(TouristApplication.name)
    private readonly touristApplicationModel: Model<TouristApplication>,
  ) {}

  // create application
  async createApplication(
    createTouristApplicationDto: CreateTouristApplicationDto,
  ) {
    try {
      const data = await this.touristApplicationModel.create(
        createTouristApplicationDto,
      );

      return {
        success: true,
        message: 'Tourist application submitted successfully',
        data,
      };
    } catch (error) {
      console.log({ error });
      throw new InternalServerErrorException(
        'Failed to submit tourist application',
      );
    }
  }

  // get all applications
  async getAllApplications() {
    try {
      const data = await this.touristApplicationModel
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
        'Failed to fetch tourist applications',
      );
    }
  }

  // get single application
  async getSingleApplication(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid application id');
      }

      const data = await this.touristApplicationModel
        .findById(id)
        .lean()
        .exec();
      console.log({ data: data });

      if (!data) {
        throw new NotFoundException('Tourist application not found');
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
        'Failed to fetch tourist application',
      );
    }
  }

  async getUserApplication(email: string) {
    try {
      const data = await this.touristApplicationModel
        .find({ createdBy: email })
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

  // update application
  async updateApplication(
    id: string,
    updateTouristApplicationDto: UpdateTouristApplicationDto,
  ) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid application id');
      }

      const data = await this.touristApplicationModel
        .findByIdAndUpdate(id, updateTouristApplicationDto, {
          new: true,
        })
        .exec();

      if (!data) {
        throw new NotFoundException('Tourist application not found');
      }

      return {
        success: true,
        message: 'Tourist application updated successfully',
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
        'Failed to update tourist application',
      );
    }
  }

  // delete application
  async deleteApplication(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid application id');
      }

      const data = await this.touristApplicationModel.findByIdAndDelete(id);

      if (!data) {
        throw new NotFoundException('Tourist application not found');
      }

      return {
        success: true,
        message: 'Tourist application deleted successfully',
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Failed to delete tourist application',
      );
    }
  }
}
