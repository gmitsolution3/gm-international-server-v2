import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { GenderEnum, ProfileStatusEnum } from '../dto/create-intern.dto';
import { InternBatch } from '../../batch/entities/batch.entity';


export type InternProfileDocument = InternProfile & Document;

@Schema({
  collection: 'Intern-Profile',
  timestamps: true,
  versionKey: false,
})
export class InternProfile {
  // Personal
  @Prop({ required: true, trim: true })
  firstName: string;

  @Prop({ required: true, trim: true })
  lastName: string;

  @Prop({
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({ required: true, index: true, trim: true })
  phone: string;

  @Prop({ required: true, enum: GenderEnum })
  gender: GenderEnum;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: true, trim: true })
  address: string;

  // Academic
  @Prop({ required: true, trim: true })
  university: string;

  @Prop({ required: true, trim: true })
  degree: string;

  @Prop({ required: true, trim: true })
  major: string;

  @Prop({ required: true })
  graduationYear: number;

  @Prop({ required: true })
  cgpa: number;

  // Batch Reference & Dates
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: InternBatch.name,
    required: true,
    index: true,
  })
  batchId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({
    required: true,
    enum: ProfileStatusEnum,
    default: ProfileStatusEnum.ACTIVE,
    index: true,
  })
  status: ProfileStatusEnum;

  @Prop({ default: '' })
  notes?: string;

  // Optional
  @Prop({ default: '' })
  imageUrl?: string;
}

export const InternProfileSchema = SchemaFactory.createForClass(InternProfile);
