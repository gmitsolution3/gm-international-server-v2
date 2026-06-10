import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import {
  CreateMedicalApplicationDto,
  UpdatePaymentDto,
} from './dto/create-medical-application.dto';
import { UpdateMedicalApplicationDto } from './dto/update-medical-application.dto';
import { MedicalApplication } from './entities/medical-application.entity';
import { MedicalPackage } from '../medical-package/entities/medical-package.entity';

@Injectable()
export class MedicalApplicationService {
  constructor(
    @InjectModel(MedicalApplication.name)
    private readonly medicalAppModel: Model<MedicalApplication>,

    @InjectModel(MedicalPackage.name)
    private readonly medicalPackageModel: Model<MedicalPackage>,
  ) {}

  async create(createMedicalApplicationDto: CreateMedicalApplicationDto) {
    try {
      const data = await this.medicalAppModel.create(
        createMedicalApplicationDto,
      );
      return {
        success: true,
        message: 'Medical application submitted successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to submit medical application',
      );
    }
  }

  async findAll() {
    try {
      const data = await this.medicalAppModel.find().exec();
      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch medical applications',
      );
    }
  }

  async findOne(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid application id');
      }
      const data = await this.medicalAppModel.findById(id).exec();
      if (!data) {
        throw new NotFoundException(`Application with ID ${id} not found`);
      }
      return {
        success: true,
        data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Failed to fetch the medical application',
      );
    }
  }

  async findUserApplication(email: string) {
    try {
      const result = await this.medicalAppModel
        .find({ createdBy: email })
        .sort({ updatedAt: -1 })
        .lean()
        .exec();

      return {
        success: true,
        message: 'Find application',
        data: result,
      };
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException(
        'Failed to fetch the medical application',
      );
    }
  }

  async update(
    id: string,
    updateMedicalApplicationDto: UpdateMedicalApplicationDto,
  ) {
    try {
      const data = await this.medicalAppModel
        .findByIdAndUpdate(id, updateMedicalApplicationDto, { new: true })
        .exec();

      if (!data) {
        throw new NotFoundException(`Application with ID ${id} not found`);
      }

      return {
        success: true,
        message: 'Medical application updated successfully',
        data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Failed to update medical application',
      );
    }
  }

  async updatePaymentStatus(id: string, updateData: UpdatePaymentDto) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid appointment id');
      }

      const result = await this.medicalAppModel.findByIdAndUpdate(
        id,
        {
          $set: {
            ...updateData,
            updatedAt: new Date(),
          },
        },
        {
          new: true,
        },
      );

      if (!result) {
        throw new NotFoundException('Appointment not found');
      }

      return {
        success: true,
        message: 'Payment updated successfully',
        data: result,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to update medical application',
      );
    }
  }
  async remove(id: string) {
    try {
      const data = await this.medicalAppModel.findByIdAndDelete(id).exec();
      if (!data) {
        throw new NotFoundException(`Application with ID ${id} not found`);
      }
      return {
        success: true,
        message: 'Medical application deleted successfully',
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Failed to delete medical application',
      );
    }
  }

  async getDashboardStats() {
    try {
      const [
        statusStats,
        paymentStats,
        recentApplications,
        topHospitals,
        monthlyTrend,
        totalApplications,
        totalHospitals,
      ] = await Promise.all([
        // Status Stats
        this.medicalAppModel.aggregate([
          {
            $group: {
              _id: '$appointmentStatus',
              count: { $sum: 1 },
            },
          },
        ]),

        // Payment Stats
        this.medicalAppModel.aggregate([
          {
            $group: {
              _id: '$paymentStatus',
              count: { $sum: 1 },
            },
          },
        ]),

        // Recent Applications
        this.medicalAppModel.find().sort({ createdAt: -1 }).limit(10).select({
          applicantId: 1,
          patientName: 1,
          email: 1,
          phoneNumber: 1,
          hospital_name: 1,
          patient_disease: 1,
          appointmentStatus: 1,
          paymentStatus: 1,
          createdAt: 1,
        }),

        // Top Hospitals
        this.medicalAppModel.aggregate([
          {
            $group: {
              _id: '$hospital_name',
              count: { $sum: 1 },
            },
          },
          {
            $sort: {
              count: -1,
            },
          },
          {
            $limit: 5,
          },
        ]),

        // Monthly Trend
        this.medicalAppModel.aggregate([
          {
            $addFields: {
              submittedDate: {
                $cond: [
                  {
                    $eq: [{ $type: '$createdAt' }, 'date'],
                  },
                  '$createdAt',
                  {
                    $cond: [
                      {
                        $eq: [{ $type: '$createdAt' }, 'string'],
                      },
                      {
                        $toDate: '$createdAt',
                      },
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
                year: {
                  $year: '$submittedDate',
                },
                month: {
                  $month: '$submittedDate',
                },
              },
              count: {
                $sum: 1,
              },
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

        this.medicalAppModel.countDocuments(),

        this.medicalPackageModel.countDocuments(),
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

      return {
        documentCount: {
          totalApplications,
          totalApproved: statusCounts.approved || 0,
          totalPending: statusCounts.pending || 0,
          totalRejected: statusCounts.reject || 0,
          totalHospitals,
        },

        paymentStats: {
          pending: paymentCounts.pending || 0,
          paid: paymentCounts.paid || 0,
          delivered: paymentCounts.delivered || 0,
          failed: paymentCounts.failed || 0,
        },

        recentApplications,
        topHospitals,
        monthlyTrend,
      };
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException('Failed to load dashboard stats');
    }
  }
}
