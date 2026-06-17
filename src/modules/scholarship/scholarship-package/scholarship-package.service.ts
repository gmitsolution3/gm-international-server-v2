import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
        .find({ isInternationalStudent: false })
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
  async getScholarshipHomePagePkg() {
    try {
      const data = await this.scholarshipPackageModel
        .find({ isInternationalStudent: false })
        .sort({ createdAt: -1 })
        .limit(3)
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

  async getScholarshipPkgDetails(id: string) {
    try {
      const data = await this.scholarshipPackageModel.findById(id);

      if (!data) {
        throw new NotFoundException('Scholarship package not found');
      }

      return {
        success: true,
        message: 'Scholarship package found successfully',
        data,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createScholarshipPackage(body: any) {
    try {
      const data = await this.scholarshipPackageModel.create(body);

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

  async searchQueryData() {
    try {
      const data = await this.scholarshipPackageModel.aggregate([
        {
          $project: {
            country: {
              $toLower: '$country',
            },

            city: {
              $arrayElemAt: [
                {
                  $split: ['$city', ','],
                },
                0,
              ],
            },

            programs: 1,
          },
        },

        {
          $unwind: '$programs',
        },

        {
          $group: {
            _id: {
              country: '$country',
              city: '$city',
            },

            programs: {
              $addToSet: '$programs',
            },
          },
        },

        {
          $group: {
            _id: '$_id.country',

            cities: {
              $push: {
                city: '$_id.city',
                programs: '$programs',
              },
            },
          },
        },

        {
          $project: {
            _id: 0,
            country: '$_id',
            cities: 1,
          },
        },
      ]);

      // সব unique programs collect করার জন্য
      const allPrograms = [
        ...new Set(
          data.flatMap((country) =>
            country.cities.flatMap((city) => city.programs),
          ),
        ),
      ];

      return {
        success: true,
        message: 'Scholarship filter data fetched successfully',

        data: {
          countryInfo: data,
          programs: allPrograms.filter(
            (program) => program && program.trim() !== '',
          ),
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch scholarship filter data',
      );
    }
  }

  // international
  async getInternationalHomeStudentPackage() {
    try {
      {
        const data = await this.scholarshipPackageModel
          .find({ isInternationalStudent: true })
          .sort({ createdAt: -1 })
          .limit(3)
          .lean()
          .exec();
        return {
          success: true,
          data,
        };
      }
    } catch (error) {}
  }

  async getInternationalAllPackage() {
    try {
      {
        const data = await this.scholarshipPackageModel
          .find({ isInternationalStudent: true })
          .sort({ createdAt: -1 })
          .lean()
          .exec();
        return {
          success: true,
          data,
        };
      }
    } catch (error) {}
  }

  async getStudentUniqueProgram() {
    const result = await this.scholarshipPackageModel.aggregate([
      {
        $unwind: '$programs',
      },
      {
        $match: {
          programs: { $nin: [null, ''] },
        },
      },
      {
        $group: {
          _id: '$programs',
        },
      },
      {
        $project: {
          _id: 0,
          program: '$_id',
        },
      },
      {
        $sort: {
          program: 1,
        },
      },
    ]);

    return {
      success: true,
      message: 'Unique programs fetched',
      data: result,
    };
  }
}
