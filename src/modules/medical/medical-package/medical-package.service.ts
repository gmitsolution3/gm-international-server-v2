import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMedicalPackageDto } from './dto/create-medical-package.dto';
import { UpdateMedicalPackageDto } from './dto/update-medical-package.dto';
import { MedicalPackage } from './entities/medical-package.entity';
import { buildKeywordSearch } from '../../../common/utils/search.util';

@Injectable()
export class MedicalPackageService {
  constructor(
    @InjectModel(MedicalPackage.name)
    private readonly medicalPkgModel: Model<MedicalPackage>,
  ) {}

  async createMedicalPkg(createMedicalPackageDto: CreateMedicalPackageDto) {
    try {
      const data = await this.medicalPkgModel.create(createMedicalPackageDto);
      return {
        success: true,
        message: 'Medical package created successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create medical package',
      );
    }
  }

  async findAll() {
    try {
      const data = await this.medicalPkgModel
        .find()
        .sort({ createdAt: -1 })
        .exec();
      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch medical packages',
      );
    }
  }

  async findHomeMedicalPkg() {
    try {
      const data = await this.medicalPkgModel
        .find()
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
        'Failed to fetch medical packages',
      );
    }
  }

  async getMedicalSearchResult(search: string) {
    try {
      if (!search) {
        throw new BadRequestException('Search is required');
      }

      const result = await this.medicalPkgModel.find({
        $or: [
          {
            hospital_name: {
              $regex: search,
              $options: 'i',
            },
          },
          {
            city_name: {
              $regex: search,
              $options: 'i',
            },
          },
          {
            provience: {
              $regex: search,
              $options: 'i',
            },
          },
        ],
      });

      if (!result.length) {
        throw new NotFoundException('Search data not available');
      }

      return {
        success: true,
        message: 'Search data found in db',
        data: result,
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Failed to fetch medical packages',
      );
    }
  }

  async getFilteredMedicalList(filters: {
    country?: string;
    city?: string;
    provience?: string;
    dept?: string;
  }) {
    try {
      const { country, city, provience, dept } = filters;

      const query: any = {};

      if (country) {
        query.country_name = country;
      }

      if (city) {
        query.city_name = city;
      }

      if (provience) {
        query.provience = provience;
      }

      if (dept) {
        query.department = {
          $regex: dept,
          $options: 'i',
        };
      }

      const result = await this.medicalPkgModel.find(query);

      if (!result.length) {
        throw new NotFoundException('No data found in db');
      }

      return {
        success: true,
        total: result.length,
        data: result,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Server Error');
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.medicalPkgModel.findById(id).exec();
      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch the medical package',
      );
    }
  }

  async getHospitalFilters() {
    try {
      const result = await this.medicalPkgModel.aggregate([
        {
          $unwind: {
            path: '$department',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: null,
            country: {
              $addToSet: '$country_name',
            },
            provience: {
              $addToSet: '$provience',
            },
            city: {
              $addToSet: '$city_name',
            },
            department: {
              $addToSet: '$department',
            },
          },
        },
        {
          $project: {
            _id: 0,
            country: 1,
            areaInfo: {
              provience: '$provience',
              city: '$city',
            },
            department: 1,
          },
        },
      ]);

      return (
        result[0] || {
          country: [],
          areaInfo: {
            provience: [],
            city: [],
          },
          department: [],
        }
      );
    } catch (error) {
      throw new InternalServerErrorException('Filter load failed');
    }
  }

  async update(id: string, updateMedicalPackageDto: UpdateMedicalPackageDto) {
    try {
      const data = await this.medicalPkgModel
        .findByIdAndUpdate(id, updateMedicalPackageDto, { new: true })
        .exec();
      return {
        success: true,
        message: 'Medical package updated successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update medical package',
      );
    }
  }

  async remove(id: string) {
    try {
      await this.medicalPkgModel.findByIdAndDelete(id).exec();
      return {
        success: true,
        message: 'Medical package deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to delete medical package',
      );
    }
  }

  // get b2b medical package
  async getB2BMedicalPackage() {
    try {
      const data = await this.medicalPkgModel
        .find()
        .select({ description: 0 })
        .lean()
        .exec();
      return { success: true, message: 'find b2b pkg', data };
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

  // chat box query

  async search(query: string) {
    const filter = buildKeywordSearch(query, [
      'hospital_name',
      'country_name',
      'city_name',
      'provience',
      'description',
    ]);

    return this.medicalPkgModel.find(filter).lean().exec();
  }
}
