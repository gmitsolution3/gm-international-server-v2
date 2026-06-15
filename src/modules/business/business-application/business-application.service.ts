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
import { BusinessDeal } from '../business-deal/entities/business-deal.entity';

@Injectable()
export class BusinessApplicationService {
  constructor(
    @InjectModel(BusinessApplication.name)
    private readonly businessApplicationModel: Model<BusinessApplication>,

    @InjectModel(BusinessPackage.name)
    private readonly businessPackageModel: Model<BusinessPackage>,

    @InjectModel(BusinessDeal.name)
    private readonly businessDealModel: Model<BusinessDeal>,

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

  async getDashboardStats() {
    try {
      const [
        companyCount,
        applicationStats,
        dealStats,
        packageStats,
        recentApplications,
        recentDeals,
        topCountries,
        monthlyTrendApplications,
        monthlyTrendDeals,
        totalBusinessApplications,
        totalBusinessDeals,
        totalBusinessPackages,
      ] = await Promise.all([
        1,

        // 2. Business Applications Stats
        this.businessApplicationModel.aggregate([
          {
            $group: {
              _id: '$applicationStatus',
              count: { $sum: 1 },
            },
          },
        ]),

        // 3. Business Deals Stats
        this.businessDealModel.aggregate([
          {
            $group: {
              _id: '$applicationStatus',
              count: { $sum: 1 },
            },
          },
        ]),

        // 4. Business Packages Stats
        this.businessPackageModel.aggregate([
          {
            $group: {
              _id: '$packageStatus',
              count: { $sum: 1 },
            },
          },
        ]),

        // 5. Recent Applications
        this.businessApplicationModel
          .find()
          .sort({ createdAt: -1 })
          .limit(4)
          .select({
            firstName: 1,
            lastName: 1,
            companyName: 1,
            email: 1,
            phone: 1,
            travelPurpose: 1,
            applicationStatus: 1,
            paymentStatus: 1,
            createdAt: 1,
            country: 1,
          })
          .lean(),

        // 6. Recent Deals
        this.businessDealModel
          .find()
          .sort({ createdAt: -1 })
          .limit(6)
          .select({
            f_name: 1,
            c_name: 1,
            c_email: 1,
            serviceTitle: 1,
            applicationStatus: 1,
            createdAt: 1,
          })
          .lean(),

        // 7. Top Countries
        this.businessApplicationModel.aggregate([
          {
            $group: {
              _id: '$country',
              count: { $sum: 1 },
            },
          },
          { $sort: { count: -1 } },
          { $limit: 5 },
        ]),

        // 8. Monthly Trend Applications
        this.businessApplicationModel.aggregate([
          {
            $addFields: {
              date: {
                $cond: [
                  { $eq: [{ $type: '$createdAt' }, 'date'] },
                  '$createdAt',
                  { $toDate: '$createdAt' },
                ],
              },
            },
          },
          {
            $match: {
              date: { $ne: null },
            },
          },
          {
            $group: {
              _id: {
                year: { $year: '$date' },
                month: { $month: '$date' },
              },
              count: { $sum: 1 },
            },
          },
          {
            $sort: {
              '_id.year': -1,
              '_id.month': -1,
            },
          },
          {
            $limit: 6,
          },
        ]),

        // 9. Monthly Trend Deals
        this.businessDealModel.aggregate([
          {
            $addFields: {
              date: {
                $cond: [
                  { $eq: [{ $type: '$createdAt' }, 'date'] },
                  '$createdAt',
                  { $toDate: '$createdAt' },
                ],
              },
            },
          },
          {
            $match: {
              date: { $ne: null },
            },
          },
          {
            $group: {
              _id: {
                year: { $year: '$date' },
                month: { $month: '$date' },
              },
              count: { $sum: 1 },
            },
          },
          {
            $sort: {
              '_id.year': -1,
              '_id.month': -1,
            },
          },
          {
            $limit: 6,
          },
        ]),

        // Counts
        this.businessApplicationModel.countDocuments(),
        this.businessDealModel.countDocuments(),
        this.businessPackageModel.countDocuments(),
      ]);

      const appStatus = applicationStats.reduce(
        (acc, cur) => {
          if (cur._id) {
            acc[cur._id.toLowerCase()] = cur.count;
          }
          return acc;
        },
        {} as Record<string, number>,
      );

      const dealStatus = dealStats.reduce(
        (acc, cur) => {
          if (cur._id) {
            acc[cur._id.toLowerCase()] = cur.count;
          }
          return acc;
        },
        {} as Record<string, number>,
      );

      return {
        documentCount: {
          totalCompanies: companyCount,
          totalBusinessApplications,
          totalBusinessDeals,
          totalBusinessPackages,

          applications: {
            approved: appStatus.approved || 0,
            pending: appStatus.pending || 0,
            rejected: appStatus.rejected || 0,
          },

          deals: {
            approved: dealStatus.approved || 0,
            pending: dealStatus.pending || 0,
          },
        },

        recentApplications,
        recentDeals,
        topCountries,
        monthlyTrendApplications,
        monthlyTrendDeals,

        summary: {
          totalBusinessActivity: totalBusinessApplications + totalBusinessDeals,
        },
      };
    } catch (error) {
      console.error('Business Dashboard Error:', error);

      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Failed to get dashboard statistics',
      );
    }
  }
}
