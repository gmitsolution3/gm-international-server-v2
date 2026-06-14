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
      console.log({ body });

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

  async getAdminDashboardStats() {
    try {
      const [
        statusStats,
        paymentStats,
        recentApplications,
        topUniversities,
        monthlyTrend,
        totalApplications,
      ] = await Promise.all([
        // 1. Application Status Stats
        this.scholarshipApplicationModel.aggregate([
          {
            $group: {
              _id: '$applicationStatus',
              count: { $sum: 1 },
            },
          },
        ]),

        // 2. Payment Status Stats
        this.scholarshipApplicationModel.aggregate([
          {
            $group: {
              _id: '$paymentStatus',
              count: { $sum: 1 },
            },
          },
        ]),

        // 3. Recent Applications
        this.scholarshipApplicationModel
          .find()
          .sort({ submittedAt: -1 })
          .limit(5)
          .select({
            applicantId: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            phoneNumber: 1,
            applicationStatus: 1,
            paymentStatus: 1,
            university: 1,
            submittedAt: 1,
          })
          .lean(),

        // 4. Top Universities
        this.scholarshipApplicationModel.aggregate([
          {
            $group: {
              _id: '$university',
              count: { $sum: 1 },
            },
          },
          { $sort: { count: -1 } },
          { $limit: 5 },
        ]),

        // 5. Monthly Trend
        this.scholarshipApplicationModel.aggregate([
          {
            $addFields: {
              submittedDate: {
                $cond: [
                  { $eq: [{ $type: '$submittedAt' }, 'date'] },
                  '$submittedAt',
                  {
                    $cond: [
                      { $eq: [{ $type: '$submittedAt' }, 'string'] },
                      { $toDate: '$submittedAt' },
                      null,
                    ],
                  },
                ],
              },
            },
          },
          {
            $match: {
              submittedDate: { $ne: null },
            },
          },
          {
            $group: {
              _id: {
                year: { $year: '$submittedDate' },
                month: { $month: '$submittedDate' },
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

        // 6. Total Applications
        this.scholarshipApplicationModel.countDocuments(),
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

      const payload = {
        documentCount: {
          totalApplications,
          totalApproved: statusCounts.approved || 0,
          totalPending: statusCounts.pending || 0,
          totalRejected: statusCounts.reject || statusCounts.rejected || 0,
        },

        paymentStats: {
          pending: paymentCounts.pending || 0,
          paid: paymentCounts.paid || 0,
          failed: paymentCounts.failed || 0,
        },

        recentApplications,
        topUniversities,
        monthlyTrend,
      };

      return {
        success: true,
        data: payload,
      };
    } catch (error) {
      throw error;
    }
  }
}
