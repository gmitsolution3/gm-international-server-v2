import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import {
  ScholarshipApplication,
  ScholarshipApplicationDocument,
} from '../application.schema';

@Injectable()
export class ScholarshipApplicationService {
  constructor(
    @InjectModel(ScholarshipApplication.name)
    private readonly scholarshipApplicationModel: Model<ScholarshipApplicationDocument>,
  ) {}

  // GET ALL
  async getAllApplications() {
    try {
      const data = await this.scholarshipApplicationModel.find().lean().exec();

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        'Failed to fetch scholarship applications',
      );
    }
  }

  // GET SINGLE
  async getSingleApplication(id: string) {
    try {
      const data = await this.scholarshipApplicationModel
        .findById(id)
        .populate('packageId')
        .lean()
        .exec();

      if (!data) {
        throw new NotFoundException('Scholarship application not found');
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  async getUserApplication(email: string) {
    try {
      const data = await this.scholarshipApplicationModel
        .find({
          createdBy: email,
        })
        .sort({ createdAt: -1 })
        .lean()
        .exec();

      if (!data.length) {
        throw new NotFoundException('Scholarship application not found');
      }
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.log(error);
      throw new error();
    }
  }

  // CREATE
  async createApplication(body: any) {
    try {
      const data = await this.scholarshipApplicationModel.create(body);
      return {
        success: true,
        message: 'Application created successfully',
        data,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to create application');
    }
  }

  // PATCH UPDATE
  async patchApplication(id: string, body: any) {
    try {
      const data = await this.scholarshipApplicationModel.findByIdAndUpdate(
        id,
        body,
        {
          new: true,
        },
      );

      console.log({ data });
      if (!data) {
        throw new NotFoundException('Scholarship application not found');
      }
      return {
        success: true,
        message: 'Application updated successfully',
        data,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // PUT UPDATE
  async putApplication(id: string, body: any) {
    try {
      const data = await this.scholarshipApplicationModel.findOneAndReplace(
        { _id: id },
        body,
        {
          new: true,
        },
      );
      if (!data) {
        throw new NotFoundException('Scholarship application not found');
      }
      return {
        success: true,
        message: 'Application replaced successfully',
        data,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // DELETE
  async deleteApplication(id: string) {
    try {
      const data = await this.scholarshipApplicationModel.findByIdAndDelete(id);
      if (!data) {
        throw new NotFoundException('Scholarship application not found');
      }
      return {
        success: true,
        message: 'Application deleted successfully',
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
