// export class MedicalReview {}
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export class MedicalReviewEntity {
  id: string;
  packageId: string | MongooseSchema.Types.ObjectId;
  userId: string | MongooseSchema.Types.ObjectId;
  userName: string;
  rating: number;
  comment?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(partial: Partial<MedicalReviewEntity>) {
    Object.assign(this, partial);
  }
}

export type MedicalReviewDocument = MedicalReview & Document;

@Schema({ timestamps: true, versionKey: false, collection: 'MedicalReviews' })
export class MedicalReview {
  @Prop({ type: Types.ObjectId, required: true })
  packageId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  userName: string;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ required: false, default: '' })
  comment: string;
}

export const MedicalReviewSchema = SchemaFactory.createForClass(MedicalReview);
