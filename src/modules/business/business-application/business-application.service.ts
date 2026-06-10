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
import { BusinessPackage } from '../business-package/entities/business-package.entity';
import { FacebookCapiService } from '../../../common/facebook-capi/facebook-capi.service';

@Injectable()
export class BusinessApplicationService {
  constructor(
    @InjectModel(BusinessApplication.name)
    private readonly businessApplicationModel: Model<BusinessApplication>,

    @InjectModel(BusinessPackage.name)
    private readonly businessPackageModel: Model<BusinessPackage>,

    private readonly facebookCapiService: FacebookCapiService,
  ) {}

  // create application
  async createBusinessApplication(dto: CreateBusinessApplicationDto) {
    try {
      const packageInfo = await this.businessPackageModel.findById(
        dto.packageId,
      );

      if (!packageInfo) {
        throw new NotFoundException('Business package not found');
      }

      const payload = {
        ...dto,
        eventName: packageInfo.eventName,
        duration: packageInfo.duration,
        packageName: packageInfo.packageName,
        minimumPax: packageInfo.minimumPax,
        maxPrice: packageInfo.maxPrice,
        paymentStatus: 'pending',
        applicationStatus: 'pending',
      };
      const application = await this.businessApplicationModel.create(payload);

      await this.businessPackageModel.updateOne(
        { _id: packageInfo._id },
        {
          $inc: {
            sold: 1,
          },
        },
      );

      await this.facebookCapiService.sendBusinessLeadPixel(application);

      return {
        success: true,
        data: application,
      };
    } catch (error) {
      console.log(error);
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to create application');
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
