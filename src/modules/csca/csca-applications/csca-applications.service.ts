import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CscaApplication,
  CscaApplicationDocument,
} from './entities/csca-application.entity';
import { CreateCscaApplicationDto } from './dto/create-csca-application.dto';

@Injectable()
export class CscaApplicationService {
  constructor(
    @InjectModel(CscaApplication.name)
    private CscaApplicationModel: Model<CscaApplicationDocument>,
  ) {}

  // 1. Notun form data create korar jonno
  async create(createFormDataDto: CreateCscaApplicationDto) {
    const createdData = new this.CscaApplicationModel(createFormDataDto);

    return {
      success: true,
      message: 'Application submitted successfully',
      data: createdData,
    };
  }

  async findAll() {
    return this.CscaApplicationModel.find().exec();
  }

  // 3. Id diye nirdisto kono data khuje ber korar jonno
  async findOne(id: string) {
    const data = await this.CscaApplicationModel.findById(id).exec();
    if (!data) {
      throw new NotFoundException(`Form data with ID "${id}" not found`);
    }
    return { success: true, message: 'find data', data };
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.CscaApplicationModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Form data with ID "${id}" not found`);
    }
    return { message: 'Form data deleted successfully' };
  }
}
