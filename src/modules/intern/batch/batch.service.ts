import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBatchDto } from './dto/create-batch.dto';
import { InternBatch, InternBatchDocument } from './entities/batch.entity';

@Injectable()
export class InternBatchService {
  // Injecting the InternBatch model into the service constructor
  constructor(
    @InjectModel(InternBatch.name)
    private readonly batchModel: Model<InternBatchDocument>,
  ) {}

  async create(createBatchDto: CreateBatchDto): Promise<InternBatch> {
    if (
      new Date(createBatchDto.endDate) <= new Date(createBatchDto.startDate)
    ) {
      throw new BadRequestException('End date must be after start date');
    }
    const newBatch = new this.batchModel(createBatchDto);
    return await newBatch.save();
  }

  async findAll(): Promise<{
    success: boolean;
    message: string;
    data: InternBatch[];
  }> {
    const result = await this.batchModel.find().exec();
    if (!result.length) {
      throw new NotFoundException('No Package found in db!!');
    }
    return { success: true, message: 'find batches', data: result };
  }

  async findOne(id: string): Promise<InternBatch> {
    const batch = await this.batchModel.findById(id).exec();
    if (!batch) {
      throw new NotFoundException(`Batch with ID "${id}" not found`);
    }
    return batch;
  }

  async update(
    id: string,
    updateBatchDto: Partial<CreateBatchDto>,
  ): Promise<InternBatch> {
    const existingBatch = await this.batchModel
      .findByIdAndUpdate(id, updateBatchDto, { new: true })
      .exec();

    if (!existingBatch) {
      throw new NotFoundException(`Batch with ID "${id}" not found`);
    }
    return existingBatch;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.batchModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Batch with ID "${id}" not found`);
    }
    return { message: 'Batch deleted successfully' };
  }
}
