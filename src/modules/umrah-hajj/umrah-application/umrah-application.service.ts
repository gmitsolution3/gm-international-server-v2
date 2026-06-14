import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { CreateUmrahHajjBookingDto } from './dto/create-umrah-application.dto';
import { UpdateUmrahHajjBookingDto } from './dto/update-umrah-application.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  UmrahHajjBooking,
  UmrahHajjBookingDocument,
} from './entities/umrah-application.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class UmrahApplicationService {
  constructor(
    @InjectModel(UmrahHajjBooking.name)
    private readonly bookingModel: Model<UmrahHajjBookingDocument>,
  ) {}

  // 1. Create a new booking/application
  async create(
    createUmrahApplicationDto: CreateUmrahHajjBookingDto,
  ): Promise<UmrahHajjBooking> {
    try {
      const newBooking = new this.bookingModel(createUmrahApplicationDto);
      return await newBooking.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          'This application or passport/email already exists.',
        );
      }
      throw new InternalServerErrorException(
        'Failed to create application. Please try again.',
      );
    }
  }

  // 2. Get all applications (Sorted by newest first)
  async findAll() {
    try {
      const data = await this.bookingModel
        .find()
        .sort({ createdAt: -1 })
        .lean()
        .exec();
      return { success: true, message: 'find application', data };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch applications.');
    }
  }

  // 3. Find a single application by ID
  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid Application ID format.');
    }

    try {
      const booking = await this.bookingModel.findById(id).exec();
      if (!booking) {
        throw new NotFoundException(`Application with ID "${id}" not found.`);
      }
      return { success: true, data: booking };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Error retrieving the application.',
      );
    }
  }

  // 4. Update an application by ID
  async update(
    id: string,
    updateUmrahApplicationDto: UpdateUmrahHajjBookingDto,
  ): Promise<UmrahHajjBooking> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid Application ID format.');
    }

    try {
      // { new: true } deway updated data tai return pabe database theke
      const updatedBooking = await this.bookingModel
        .findByIdAndUpdate(id, updateUmrahApplicationDto, {
          new: true,
          runValidators: true,
        })
        .exec();

      if (!updatedBooking) {
        throw new NotFoundException(`Application with ID "${id}" not found.`);
      }
      return updatedBooking;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Failed to update the application.',
      );
    }
  }

  // 5. Delete/Remove an application
  async remove(id: string): Promise<{ message: string }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid Application ID format.');
    }

    try {
      const deletedBooking = await this.bookingModel
        .findByIdAndDelete(id)
        .exec();

      if (!deletedBooking) {
        throw new NotFoundException(`Application with ID "${id}" not found.`);
      }
      return { message: 'Application successfully deleted' };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Failed to delete the application.',
      );
    }
  }

  // dashboard stats
  async getDashboardStats() {
    try {
      const [
        totalBookings,
        statusStats,
        paymentStats,
        recentBookings,
        topPackages,
        monthlyTrend,
        genderStats,
      ] = await Promise.all([
        // 1. Total Bookings
        this.bookingModel.countDocuments(),

        // 2. Application Status Stats
        this.bookingModel.aggregate([
          {
            $group: {
              _id: '$applicationStatus',
              count: { $sum: 1 },
            },
          },
        ]),

        // 3. Payment Status Stats
        this.bookingModel.aggregate([
          {
            $group: {
              _id: '$payment.paymentStatus',
              count: { $sum: 1 },
            },
          },
        ]),

        // 4. Recent Bookings
        this.bookingModel
          .find()
          .sort({ createdAt: -1 })
          .limit(5)
          .select({
            'applicantInfo.fullName': 1,
            'applicantInfo.email': 1,
            'applicantInfo.phone': 1,
            'applicantInfo.gender': 1,
            'travelInfo.packageType': 1,
            'pkgInfo.pkgName': 1,
            applicationStatus: 1,
            'payment.paymentStatus': 1,
            createdAt: 1,
          })
          .lean(),

        // 5. Top Packages
        this.bookingModel.aggregate([
          {
            $group: {
              _id: '$pkgInfo.pkgName',
              count: { $sum: 1 },
              totalRevenue: {
                $sum: {
                  $toDouble: '$pkgInfo.pkgPrice',
                },
              },
            },
          },
          { $sort: { count: -1 } },
          { $limit: 6 },
        ]),

        // 6. Monthly Trend
        this.bookingModel.aggregate([
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
          { $limit: 6 },
        ]),

        // 7. Gender Stats
        this.bookingModel.aggregate([
          {
            $group: {
              _id: '$applicantInfo.gender',
              count: { $sum: 1 },
            },
          },
        ]),
      ]);

      const appStatus = statusStats.reduce(
        (acc, cur) => {
          if (cur._id) {
            acc[cur._id.toLowerCase()] = cur.count;
          }
          return acc;
        },
        {} as Record<string, number>,
      );

      const payStatus = paymentStats.reduce(
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
          totalBookings,

          applications: {
            pending: appStatus.pending || 0,
            approved: appStatus.approved || 0,
            rejected: appStatus.reject || appStatus.rejected || 0,
          },

          payment: {
            pending: payStatus.pending || 0,
            partial: payStatus.partial || 0,
            paid: payStatus.paid || 0,
          },
        },

        genderStats: genderStats.map((item) => ({
          gender: item._id || 'Unknown',
          count: item.count,
        })),

        recentBookings,
        topPackages,
        monthlyTrend,

        summary: {
          totalRevenue: topPackages.reduce(
            (sum, pkg) => sum + (pkg.totalRevenue || 0),
            0,
          ),
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch dashboard statistics.',
      );
    }
  }
}
