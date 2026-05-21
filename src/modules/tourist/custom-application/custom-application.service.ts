import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';
import { TouristQuery } from './entities/custom-application.entity';
import { CreateTouristQueryDto } from './dto/create-custom-application.dto';
import { UpdateCustomApplicationDto } from './dto/update-custom-application.dto';


@Injectable()
export class TouristQueryService {
  constructor(
    @InjectModel(TouristQuery.name)
    private readonly touristQueryModel: Model<TouristQuery>,
  ) {}

  // create query
  async createQuery(createTouristQueryDto: CreateTouristQueryDto) {
    try {
      const data = await this.touristQueryModel.create(createTouristQueryDto);

      return {
        success: true,
        message: 'Tourist query submitted successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to submit tourist query');
    }
  }

  // get all queries
  async getAllQueries() {
    try {
      const data = await this.touristQueryModel
        .find()
        .sort({ createdAt: -1 })
        .lean()
        .exec();

      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch tourist queries');
    }
  }

  // get single query
  async getSingleQuery(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid query id');
      }

      const data = await this.touristQueryModel.findById(id).lean().exec();

      if (!data) {
        throw new NotFoundException('Tourist query not found');
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

      throw new InternalServerErrorException('Failed to fetch tourist query');
    }
  }

  // update query
  async updateQuery(
    id: string,
    updateTouristQueryDto: UpdateCustomApplicationDto,
  ) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid query id');
      }

      const data = await this.touristQueryModel
        .findByIdAndUpdate(id, updateTouristQueryDto, {
          new: true,
        })
        .exec();

      if (!data) {
        throw new NotFoundException('Tourist query not found');
      }

      return {
        success: true,
        message: 'Tourist query updated successfully',
        data,
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to update tourist query');
    }
  }

  // delete query
  async deleteQuery(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid query id');
      }

      const data = await this.touristQueryModel.findByIdAndDelete(id);

      if (!data) {
        throw new NotFoundException('Tourist query not found');
      }

      return {
        success: true,
        message: 'Tourist query deleted successfully',
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to delete tourist query');
    }
  }
}
