import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
  MedicalReview,
  MedicalReviewDocument,
} from './entities/medical-review.entity';
import { CreateMedicalReviewDto } from './dto/create-medical-review.dto';

@Injectable()
export class MedicalReviewService {
  constructor(
    @InjectModel(MedicalReview.name)
    private readonly medicalReviewModel: Model<MedicalReviewDocument>,
  ) {}
  async createReview(createMedicalReviewDto: CreateMedicalReviewDto) {
    const review = await this.medicalReviewModel.create({
      ...createMedicalReviewDto,
      packageId: new Types.ObjectId(createMedicalReviewDto.packageId),
      userId: new Types.ObjectId(createMedicalReviewDto.userId),
    });

    return {
      success: true,
      message: 'Review created successfully',
      data: review,
    };
  }
  async getHospitalReviews(packageId: string) {
    try {
      const reviews = await this.medicalReviewModel.find({
        packageId: new Types.ObjectId(packageId),
      });

      if (!reviews.length) {
        return {
          success: false,
          message: 'No review found',
          data: [],
        };
      }

      return {
        success: true,
        message: 'Review found',
        data: reviews,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch reviews');
    }
  }

  async updateReview(id: string, updateData: Partial<CreateMedicalReviewDto>) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid review id');
      }

      const review = await this.medicalReviewModel.findByIdAndUpdate(
        id,
        {
          ...updateData,
          updatedAt: new Date(),
        },
        {
          new: true,
          upsert: true,
        },
      );

      return {
        success: true,
        message: 'Data updated successfully',
        data: review,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to update review');
    }
  }

  async deleteReview(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid review id');
      }

      const result = await this.medicalReviewModel.findByIdAndDelete(id);

      if (!result) {
        throw new NotFoundException('Data not deleted yet!!');
      }

      return {
        success: true,
        message: 'Review deleted successfully',
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to delete review');
    }
  }
}
