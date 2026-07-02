import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  VisaApplication,
  VisaApplicationDocument,
} from './entities/visa-application.entity';
import { Model } from 'mongoose';
import { CreateVisaApplicationDto } from './dto/create-visa-application.dto';
import { UpdateVisaApplicationDto } from './dto/update-visa-application.dto';

@Injectable()
export class VisaApplicationsService {
  constructor(
    @InjectModel(VisaApplication.name)
    private readonly visaApplicationModel: Model<VisaApplicationDocument>,
  ) {}

  async create(createVisaApplicationDto: CreateVisaApplicationDto) {
    const application = await this.visaApplicationModel.create(
      createVisaApplicationDto,
    );

    return {
      success: true,
      message: 'Application submitted successfully',
      data: application,
    };
  }

  async findAll() {
    const applications = await this.visaApplicationModel
      .find()
      .sort({ createdAt: -1 });

    return {
      success: true,
      count: applications.length,
      data: applications,
    };
  }

  async findOne(id: string) {
    const application = await this.visaApplicationModel.findById(id);

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    return {
      success: true,
      data: application,
    };
  }

  async update(id: string, updateVisaApplicationDto: UpdateVisaApplicationDto) {
    const application = await this.visaApplicationModel.findByIdAndUpdate(
      id,
      updateVisaApplicationDto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    return {
      success: true,
      message: 'Application updated successfully',
      data: application,
    };
  }

  async remove(id: string) {
    const application = await this.visaApplicationModel.findByIdAndDelete(id);

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    return {
      success: true,
      message: 'Application deleted successfully',
    };
  }
}
