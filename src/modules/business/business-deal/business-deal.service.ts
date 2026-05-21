import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';

import { BusinessDeal } from './entities/business-deal.entity';

import { CreateBusinessDealDto } from './dto/create-business-deal.dto';

import { UpdateBusinessDealDto } from './dto/update-business-deal.dto';

@Injectable()
export class BusinessDealService {
  constructor(
    @InjectModel(BusinessDeal.name)
    private readonly businessDealModel: Model<BusinessDeal>,
  ) {}

  // create deal
  async createDeal(createBusinessDealDto: CreateBusinessDealDto) {
    try {
      const data = await this.businessDealModel.create(createBusinessDealDto);

      return {
        success: true,
        message: 'Business deal submitted successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to submit business deal');
    }
  }

  // get all deals
  async getAllDeals() {
    try {
      const data = await this.businessDealModel
        .find()
        .sort({ createdAt: -1 })
        .lean()
        .exec();

      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch business deals');
    }
  }

  // get single deal
  async getSingleDeal(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid deal id');
      }

      const data = await this.businessDealModel.findById(id).lean().exec();

      if (!data) {
        throw new NotFoundException('Business deal not found');
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

      throw new InternalServerErrorException('Failed to fetch business deal');
    }
  }

  // update deal
  async updateDeal(id: string, updateBusinessDealDto: UpdateBusinessDealDto) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid deal id');
      }

      const data = await this.businessDealModel
        .findByIdAndUpdate(id, updateBusinessDealDto, {
          new: true,
        })
        .exec();

      if (!data) {
        throw new NotFoundException('Business deal not found');
      }

      return {
        success: true,
        message: 'Business deal updated successfully',
        data,
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to update business deal');
    }
  }

  // delete deal
  async deleteDeal(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid deal id');
      }

      const data = await this.businessDealModel.findByIdAndDelete(id);

      if (!data) {
        throw new NotFoundException('Business deal not found');
      }

      return {
        success: true,
        message: 'Business deal deleted successfully',
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to delete business deal');
    }
  }
}
