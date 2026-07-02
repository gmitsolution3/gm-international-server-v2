import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVisaFromDto } from './dto/create-visa-from.dto';
import {
  VisaFile,
  VisaFileDocument,
  VisaFrom,
  VisaFromDocument,
} from './entities/visa-from.entity';

@Injectable()
export class VisaFromService {
  constructor(
    @InjectModel(VisaFrom.name)
    private readonly formDataModel: Model<VisaFromDocument>,

    @InjectModel(VisaFile.name)
    private readonly fileDataModel: Model<VisaFileDocument>,
  ) {}

  async getFormData(query: CreateVisaFromDto) {
    const { country, visaType } = query;

    const form = await this.formDataModel.findOne();

    if (!form) {
      throw new NotFoundException('Form not found');
    }

    const matched = form.formData.find(
      (item) =>
        item.country.toLowerCase() === country.toLowerCase() &&
        item.visaType.toLowerCase() === visaType.toLowerCase(),
    );

    if (!matched) {
      throw new NotFoundException('Data not found');
    }

    return matched;
  }
  async getFileData(query: CreateVisaFromDto) {
    const { country, visaType } = query;

    const form = await this.fileDataModel.findOne();

    if (!form) {
      throw new NotFoundException('Form not found');
    }

    const matched = form.fileData.find(
      (item) =>
        item.country.toLowerCase() === country.toLowerCase() &&
        item.visaType.toLowerCase() === visaType.toLowerCase(),
    );

    if (!matched) {
      throw new NotFoundException('Data not found');
    }

    return matched;
  }
}
