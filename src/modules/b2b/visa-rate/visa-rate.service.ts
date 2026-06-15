import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VisaRate, VisaRateDocument } from './entities/visa-rate.entity';
import { CreateVisaRateDto } from './dto/create-visa-rate.dto';
import { UpdateVisaRateDto } from './dto/update-visa-rate.dto';

@Injectable()
export class VisaRateService {
  constructor(
    @InjectModel(VisaRate.name)
    private readonly visaPackageModel: Model<VisaRateDocument>,
  ) {}

  // 1. Create Operation
  async create(createVisaPackageDto: CreateVisaRateDto) {
    try {
      const newPackage =
        await this.visaPackageModel.create(createVisaPackageDto);
      return {
        success: true,
        message: 'Visa package created successfully',
        data: newPackage,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create visa package');
    }
  }

  // 2. Read All Operation (With Sorting)
  async findAll() {
    try {
      const data = await this.visaPackageModel
        .find({})
        .sort({ createdAt: -1 })
        .exec();
      return {
        success: true,
        message: 'All visa packages fetched successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch visa packages');
    }
  }

  // 3. Read Single Operation (By ID)
  async findOne(id: string) {
    try {
      const data = await this.visaPackageModel.findById(id).exec();
      if (!data) {
        throw new NotFoundException(`Visa package with ID ${id} not found`);
      }
      return {
        success: true,
        message: 'Visa package fetched successfully',
        data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Failed to fetch the visa package',
      );
    }
  }

  // 4. Update Operation (By ID)
  async update(id: string, updateVisaPackageDto: UpdateVisaRateDto) {
    try {
      const updatedData = await this.visaPackageModel
        .findByIdAndUpdate(id, updateVisaPackageDto, { new: true })
        .exec();

      if (!updatedData) {
        throw new NotFoundException(`Visa package with ID ${id} not found`);
      }
      return {
        success: true,
        message: 'Visa package updated successfully',
        data: updatedData,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update visa package');
    }
  }

  // 5. Delete Operation (By ID)
  async remove(id: string) {
    try {
      const deletedData = await this.visaPackageModel
        .findByIdAndDelete(id)
        .exec();
      if (!deletedData) {
        throw new NotFoundException(`Visa package with ID ${id} not found`);
      }
      return { success: true, message: 'Visa package deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete visa package');
    }
  }
}
