import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateB2bApplicationDto } from './dto/update-b2b_application.dto';
import { CreateB2BApplicationDto } from './dto/create-b2b_application.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  B2BApplication,
  B2BApplicationDocument,
} from './entities/b2b_application.entity';

@Injectable()
export class B2bApplicationsService {
  constructor(
    @InjectModel(B2BApplication.name)
    private readonly B2BApplicationModel: Model<B2BApplicationDocument>,
  ) {}

  async create(createB2bApplicationDto: CreateB2BApplicationDto) {
    try {
      const data = await this.B2BApplicationModel.create(
        createB2bApplicationDto,
      );

      return {
        success: true,
        message: 'Application created successfully',
        data,
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch business deal');
    }
  }

  async findAll() {
    try {
      const data = await this.B2BApplicationModel.find()
        .sort({ createdAt: -1 })
        .lean()
        .exec();
      return {
        success: true,
        message: 'find All applications',
        data,
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch business deal');
    }
  }

  async findOne(id: string) {
    const data = await this.B2BApplicationModel.findById(id);
    return {
      success: true,
      message: 'Find single application',
      data,
    };
  }

  async update(id: string, updateB2bApplicationDto: UpdateB2bApplicationDto) {
    const data = await this.B2BApplicationModel.findByIdAndUpdate(
      id,
      updateB2bApplicationDto,
    );
    return {
      success: true,
      message: 'Application updated successful',
      data,
    };
  }

  async remove(id: string) {
    const data = await this.B2BApplicationModel.findByIdAndDelete(id);
    return {
      success: true,
      message: 'Application deleted successfully',
      data,
    };
    return `This action removes a #${id} b2bApplication`;
  }
}
