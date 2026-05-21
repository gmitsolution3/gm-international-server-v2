import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScholarshipPackage } from '../scholarship.schema';


@Injectable()
export class ScholarshipPackageService {
  constructor(
    @InjectModel(ScholarshipPackage.name)
    private readonly scholarshipPackageModel: Model<ScholarshipPackage>,
  ) {}

  async getScholarshipPackageManagement() {
    try {
      const data = await this.scholarshipPackageModel
        .find()
        .sort({ createdAt: -1 })
        .exec();
      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch scholarship packages',
      );
    }
  }

  async createScholarshipPackage(body: any) {
    try {
      const data = await this.scholarshipPackageModel.create(body);

      console.log({ data });

      return {
        success: true,
        message: 'Scholarship package created successfully',
        data,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Failed to create scholarship package',
      );
    }
  }


  // update
  async updateScholarshipPackage(id: string, body: any) {
    try {
      const data = await this.scholarshipPackageModel.findByIdAndUpdate(
        id,
        body,
        {
          new: true,
        },
      );

      if (!data) {
        throw new NotFoundException('Scholarship package not found');
      }

      return {
        success: true,
        message: 'Scholarship package updated successfully',
        data,
      };
    } catch (error) {
      throw error;
    }
  }


  // delete
  async deleteScholarshipPackage(id: string) {
    try {
      const data = await this.scholarshipPackageModel.findByIdAndDelete(id);

      if (!data) {
        throw new NotFoundException('Scholarship package not found');
      }

      return {
        success: true,
        message: 'Scholarship package deleted successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
