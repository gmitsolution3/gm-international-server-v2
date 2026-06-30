import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { TouristPackage } from './entities/tourist-package.entity';
import { CreateTouristPackageDto } from './dto/create-tourist-package.dto';
import { UpdateTouristPackageDto } from './dto/update-tourist-package.dto';
import {
  TouristApplication,
  TouristApplicationDocument,
} from '../tourist-application/entities/tourist-application.entity';
import {
  TouristQuery,
  TouristQueryDocument,
} from '../custom-application/entities/custom-application.entity';
import { buildKeywordSearch } from '../../../common/utils/search.util';

@Injectable()
export class TouristPackageService {
  constructor(
    @InjectModel(TouristPackage.name)
    private readonly touristPackageModel: Model<TouristPackage>,
    @InjectModel(TouristApplication.name)
    private readonly touristPackageUserBookingModel: Model<TouristApplicationDocument>,

    @InjectModel(TouristQuery.name)
    private readonly customPackageModel: Model<TouristQueryDocument>,
  ) {}

  // create tourist package
  async createPackage(createTouristPackageDto: CreateTouristPackageDto) {
    try {
      const data = await this.touristPackageModel.create(
        createTouristPackageDto,
      );

      return {
        success: true,
        message: 'Tourist package created successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create tourist package',
      );
    }
  }

  // home page
  async getTouristPackages() {
    try {
      const data = await this.touristPackageModel
        .find({
          isInternationalPackage: false,
        })
        .sort({ updatedAt: -1 })
        .limit(3)
        .lean()
        .exec();

      return {
        success: true,
        message: 'Tourist package created successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create tourist package',
      );
    }
  }

  // get all tourist packages
  async getAllPackages() {
    try {
      const data = await this.touristPackageModel
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
        'Failed to fetch tourist packages',
      );
    }
  }

  async getAllPkgBdClient() {
    try {
      const data = await this.touristPackageModel
        .find({ isInternationalPackage: false })
        .sort({ createdAt: -1 })
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
  async getAllPkgIntClient() {
    try {
      const data = await this.touristPackageModel
        .find({ isInternationalPackage: true })
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
        'Failed to fetch tourist packages',
      );
    }
  }
  async getHomePkgIntClient() {
    try {
      const data = await this.touristPackageModel
        .find({ isInternationalPackage: true })
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
        'Failed to fetch tourist packages',
      );
    }
  }

  // get single tourist package
  async getSinglePackage(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid package id');
      }

      const data = await this.touristPackageModel.findById(id).lean().exec();

      if (!data) {
        throw new NotFoundException('Tourist package not found');
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

      throw new InternalServerErrorException('Failed to fetch tourist package');
    }
  }

  async AnalysisDashboard() {
    try {
      const [
        statusStats,
        paymentStats,
        recentBookings,
        topPackages,
        monthlyTrend,
        packageTypeStats,
        totalBookings,
        totalTourPackages,
        totalCustomPackage,
      ] = await Promise.all([
        // Booking Status
        this.touristPackageUserBookingModel.aggregate([
          {
            $group: {
              _id: '$bookingStatus',
              count: { $sum: 1 },
            },
          },
        ]),

        // Payment Status
        this.touristPackageUserBookingModel.aggregate([
          {
            $group: {
              _id: '$paymentStatus',
              count: { $sum: 1 },
            },
          },
        ]),

        // Recent Bookings
        this.touristPackageUserBookingModel
          .find()
          .sort({ createdAt: -1 })
          .limit(5)
          .select({
            fullName: 1,
            email: 1,
            phoneNumber: 1,
            packageInfo: 1,
            location: 1,
            totalCost: 1,
            paymentStatus: 1,
            createdAt: 1,
          })
          .lean(),

        // Top Packages
        this.touristPackageUserBookingModel.aggregate([
          {
            $group: {
              _id: '$packageInfo.packageName',
              count: { $sum: 1 },
            },
          },
          { $sort: { count: -1 } },
          { $limit: 6 },
        ]),

        // Monthly Trend
        this.touristPackageUserBookingModel.aggregate([
          {
            $addFields: {
              bookingDate: {
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
              bookingDate: { $ne: null },
            },
          },
          {
            $group: {
              _id: {
                year: { $year: '$bookingDate' },
                month: { $month: '$bookingDate' },
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

        // International vs Domestic
        this.touristPackageUserBookingModel.aggregate([
          {
            $group: {
              _id: '$isInternationalPackage',
              count: { $sum: 1 },
              totalRevenue: {
                $sum: {
                  $toDouble: '$totalCost',
                },
              },
            },
          },
        ]),

        this.touristPackageUserBookingModel.countDocuments(),

        this.touristPackageModel.countDocuments(),

        this.customPackageModel.countDocuments(),
      ]);

      const statusCounts = statusStats.reduce(
        (acc, cur) => {
          if (cur._id) {
            acc[cur._id.toLowerCase()] = cur.count;
          }
          return acc;
        },
        {} as Record<string, number>,
      );

      const paymentCounts = paymentStats.reduce(
        (acc, cur) => {
          if (cur._id) {
            acc[cur._id.toLowerCase()] = cur.count;
          }
          return acc;
        },
        {} as Record<string, number>,
      );

      const internationalStats = packageTypeStats.find(
        (item) => item._id === true,
      ) || {
        count: 0,
        totalRevenue: 0,
      };

      const domesticStats = packageTypeStats.find(
        (item) => item._id === false,
      ) || {
        count: 0,
        totalRevenue: 0,
      };

      const payload = {
        documentCount: {
          totalBookings,
          totalApproved: statusCounts.approved || 0,
          totalPending: statusCounts.pending || 0,
          totalInternationalBookings: internationalStats.count,
          totalDomesticBookings: domesticStats.count,
          totalTourPackages,
          totalCustomPackage,
        },

        paymentStats: paymentCounts,

        internationalVsDomestic: {
          international: internationalStats.count,
          domestic: domesticStats.count,
          internationalRevenue: internationalStats.totalRevenue,
          domesticRevenue: domesticStats.totalRevenue,
        },

        recentBookings,
        topPackages,
        monthlyTrend,
      };

      return { success: true, data: payload };
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException(
        'Failed to fetch dashboard analytics',
      );
    }
  }

  // update tourist package
  async updatePackage(
    id: string,
    updateTouristPackageDto: UpdateTouristPackageDto,
  ) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid package id');
      }

      const data = await this.touristPackageModel
        .findByIdAndUpdate(id, updateTouristPackageDto, {
          new: true,
        })
        .exec();

      if (!data) {
        throw new NotFoundException('Tourist package not found');
      }

      return {
        success: true,
        message: 'Tourist package updated successfully',
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
        'Failed to update tourist package',
      );
    }
  }

  // delete tourist package
  async deletePackage(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid package id');
      }

      const data = await this.touristPackageModel.findByIdAndDelete(id);

      if (!data) {
        throw new NotFoundException('Tourist package not found');
      }

      return {
        success: true,
        message: 'Tourist package deleted successfully',
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Failed to delete tourist package',
      );
    }
  }

  // chat box search query

  async search(query: string) {
    const filter = buildKeywordSearch(query, [
      'p_title',
      'country',
      'start_form',
      'tour_plan.destination',
      'tour_plan.sub_destination',
      'description',
    ]);

    return this.touristPackageModel.find(filter).lean().exec();
  }
}
