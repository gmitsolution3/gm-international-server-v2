import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMedicalApplicationDto } from './dto/create-medical-application.dto';
import { UpdateMedicalApplicationDto } from './dto/update-medical-application.dto';
import { MedicalApplication } from './entities/medical-application.entity';

@Injectable()
export class MedicalApplicationService {
  constructor(
    @InjectModel(MedicalApplication.name)
    private readonly medicalAppModel: Model<MedicalApplication>,
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
}
