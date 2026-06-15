import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateB2bUserDto } from './dto/create-b2b_user.dto';
import { UpdateB2bUserDto } from './dto/update-b2b_user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { B2bUser, B2bUserDocument } from './entities/b2b_user.entity';
import { Model } from 'mongoose';
import { ScholarshipPackage } from '../../scholarship/scholarship.schema';
import { TouristPackage } from '../../tourist/tourist-package/entities/tourist-package.entity';

@Injectable()
export class B2bUserService {
  constructor(
    @InjectModel(B2bUser.name)
    private readonly B2BUserModel: Model<B2bUserDocument>,

    @InjectModel(ScholarshipPackage.name)
    private readonly scholarshipPackageModel: Model<ScholarshipPackage>,

    @InjectModel(TouristPackage.name)
    private readonly touristPackageModel: Model<TouristPackage>,
  ) {}
  async create(createB2bUserDto: CreateB2bUserDto) {
    const data = await this.B2BUserModel.create(createB2bUserDto);
    return {
      success: true,
      message: 'B2B User created successful',
    };
  }

  async findAll() {
    const data = await this.B2BUserModel.find({})
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    return { success: true, message: 'find users', data };
  }

  async findOne(id: string) {
    const data = await this.B2BUserModel.findById(id);
    return { success: true, message: 'find targeted user', data };
  }

  async update(id: string, updateB2bUserDto: UpdateB2bUserDto) {
    const data = await this.B2BUserModel.findByIdAndUpdate(
      id,
      updateB2bUserDto,
    );
    return { success: true, message: 'User updated successfully', data };
  }

  async remove(id: string) {
    const data = await this.B2BUserModel.findByIdAndDelete(id);
    return { success: true, message: 'User deleted successfully', data };
    return `This action removes a #${id} b2bUser`;
  }

  // user dashboard
  async getDashboardStats() {
    try {
      const query = { isB2B: true };
      const schQuery = { b2b: true };
      const [b2bSchPkg, b2bTouristPkg] = await Promise.all([
        this.scholarshipPackageModel.countDocuments(schQuery),
        this.touristPackageModel.countDocuments(query),
      ]);

      return {
        success: true,
        message: 'Find data',
        data: { b2bSchPkg, b2bTouristPkg },
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getB2BStdPkg() {
    try {
      const data = await this.scholarshipPackageModel
        .find({})
        .sort({ createdAt: -1 })
        .select({ description: 0, universityDescription: 0 })
        .lean()
        .exec();

      return { success: true, message: 'find data', data };
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
  async getB2BTouristPkg() {
    try {
      const data = await this.touristPackageModel
        .find({})
        .sort({ createdAt: -1 })
        .select({
          description: 0,
          excludes: 0,
          tour_plan: 0,
          isInternationalPackage: 0,
          gallery: 0,
          international_package_price: 0,
          includes: 0,
        })
        .lean()
        .exec();

      return { success: true, message: 'find data', data };
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
}
