import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false }) 
class Phase {
  @Prop({ required: true })
  phaseNumber: string;

  @Prop({ required: true })
  startDate: string;

  @Prop({ required: true })
  endDate: string;

  @Prop({ required: true })
  returnCity: string;
}

@Schema({ timestamps: true, collection: 'business_packages', versionKey: false })
export class BusinessPackage extends Document {
  @Prop({ required: true })
  packageName: string;

  @Prop({ required: true })
  eventName: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true })
  country: string;

  @Prop({ type: [Phase], required: true })
  phases: Phase[];

  @Prop({ default: '' })
  hotelName: string;

  @Prop({ default: '' })
  hotelRating: string;

  @Prop({ required: true })
  maxPrice: number;

  @Prop({ required: true })
  minimumPax: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: '' })
  photo: string;

  @Prop({ required: true })
  createdBy: string;

  @Prop({ default: 'active' })
  packageStatus: string;

  @Prop({ type: Boolean, default: false })
  isWithVisaAndAirTicket: boolean;

  @Prop({ type: Boolean, default: false })
  isB2B: boolean;

  @Prop({ type: Number, default: 0 })
  B2BPrice: number;
}

export const BusinessPackageSchema =
  SchemaFactory.createForClass(BusinessPackage);
