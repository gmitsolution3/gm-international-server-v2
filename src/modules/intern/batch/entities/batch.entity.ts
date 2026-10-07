import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BatchStatus } from '../dto/create-batch.dto';

export type InternBatchDocument = InternBatch & Document;

@Schema({
  collection: 'Intern-Batch',
  timestamps: true,
  versionKey: false,
})
export class InternBatch {
  @Prop({ required: true, trim: true })
  batchName: string;

  @Prop({ required: true, unique: true, index: true })
  batchNumber: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, index: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({
    required: true,
    enum: BatchStatus,
    default: BatchStatus.UPCOMING,
    index: true,
  })
  status: BatchStatus;

  @Prop({ required: true })
  maxIntern: number;

  @Prop({ required: true })
  createdBy: string;
}

export const InternBatchSchema = SchemaFactory.createForClass(InternBatch);
