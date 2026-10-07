import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InternProfile, InternProfileDocument } from './entities/intern.entity';
import {
  CreateInternProfileDto,
  ProfileStatusEnum,
} from './dto/create-intern.dto';
import {
  InternBatch,
  InternBatchDocument,
} from '../batch/entities/batch.entity';

@Injectable()
export class InternProfileService {
  constructor(
    @InjectModel(InternProfile.name)
    private readonly internProfileModel: Model<InternProfileDocument>,
    @InjectModel(InternBatch.name)
    private readonly internBatchModel: Model<InternBatchDocument>,
  ) {}

  async create(createDto: CreateInternProfileDto): Promise<InternProfile> {
    if (new Date(createDto.endDate) <= new Date(createDto.startDate)) {
      throw new BadRequestException('End date must be after start date');
    }

    const createdProfile = new this.internProfileModel(createDto);
    return await createdProfile.save();
  }

  async findAll(): Promise<{
    success: boolean;
    message: string;
    data: InternProfile[];
  }> {
    const result = await this.internProfileModel
      .find()
      .populate('batchId', 'batchName batchNumber startDate endDate maxIntern')
      .exec();

    if (!result.length) {
      throw new NotFoundException('No intern profile found in db');
    }
    return { success: true, message: 'Find the intern Profile', data: result };
  }

  async findOne(id: string): Promise<InternProfile> {
    const profile = await this.internProfileModel
      .findById(id)
      .populate('batchId')
      .exec();

    if (!profile) {
      throw new NotFoundException(`Intern profile with ID "${id}" not found`);
    }
    return profile;
  }

  async update(
    id: string,
    updateDto: Partial<CreateInternProfileDto>,
  ): Promise<InternProfile> {
    const updatedProfile = await this.internProfileModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .populate('batchId')
      .exec();

    if (!updatedProfile) {
      throw new NotFoundException(`Intern profile with ID "${id}" not found`);
    }
    return updatedProfile;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.internProfileModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Intern profile with ID "${id}" not found`);
    }
    return { message: 'Intern profile deleted successfully' };
  }

  async dashboardAnalytics() {
    const [overview, batchStats, profileAnalytics] = await Promise.all([
      this.getOverviewMetrics(),

      this.getBatchDeepAnalytics(),
      this.getProfileDeepAnalytics(),
    ]);

    return {
      overview,
      batchStats,
      profileAnalytics,
    };
  }

  // Helper 1: General High-level Summary
  private async getOverviewMetrics() {
    const [totalBatches, totalInterns, activeInterns] = await Promise.all([
      this.internBatchModel.countDocuments(),
      this.internProfileModel.countDocuments(),
      this.internProfileModel.countDocuments({
        status: ProfileStatusEnum.ACTIVE,
      }),
    ]);

    return {
      totalBatches,
      totalInterns,
      activeInterns,
      completionRate:
        totalInterns > 0
          ? ((totalInterns - activeInterns) / totalInterns) * 100
          : 0,
    };
  }

  // Helper 2: Detailed Batch Metrics with Joined Profile Counts
  private async getBatchDeepAnalytics() {
    return await this.internBatchModel.aggregate([
      {
        $lookup: {
          from: 'Intern-Profile',
          localField: '_id',
          foreignField: 'batchId',
          as: 'interns',
        },
      },
      {
        $project: {
          _id: 1,
          batchName: 1,
          batchNumber: 1,
          status: 1,
          maxIntern: 1,
          totalEnrolled: { $size: '$interns' },
          activeInternsCount: {
            $size: {
              $filter: {
                input: '$interns',
                as: 'intern',
                cond: { $eq: ['$$intern.status', 'ACTIVE'] },
              },
            },
          },
          completedInternsCount: {
            $size: {
              $filter: {
                input: '$interns',
                as: 'intern',
                cond: { $eq: ['$$intern.status', 'COMPLETED'] },
              },
            },
          },
          occupancyRate: {
            $multiply: [
              { $divide: [{ $size: '$interns' }, '$maxIntern'] },
              100,
            ],
          },
          startDate: 1,
          endDate: 1,
        },
      },
      { $sort: { batchNumber: -1 } },
    ]);
  }

  // Helper 3: Deep Demographics & Academic Breakdown
  private async getProfileDeepAnalytics() {
    const analytics = await this.internProfileModel.aggregate([
      {
        $facet: {
          // Status Distribution
          statusBreakdown: [{ $group: { _id: '$status', count: { $sum: 1 } } }],

          // Gender Distribution
          genderBreakdown: [{ $group: { _id: '$gender', count: { $sum: 1 } } }],

          // CGPA Metrics & Buckets
          cgpaMetrics: [
            {
              $group: {
                _id: null,
                avgCgpa: { $avg: '$cgpa' },
                maxCgpa: { $max: '$cgpa' },
                minCgpa: { $min: '$cgpa' },
              },
            },
          ],
          cgpaDistribution: [
            {
              $bucket: {
                groupBy: '$cgpa',
                boundaries: [0, 2.5, 3.0, 3.5, 3.8, 4.01],
                default: 'Other',
                output: { count: { $sum: 1 } },
              },
            },
          ],

          // Top 5 Universities
          topUniversities: [
            { $group: { _id: '$university', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
          ],

          // Top Majors / Departments
          topMajors: [
            { $group: { _id: '$major', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
          ],
        },
      },
    ]);

    return analytics[0];
  }
}
