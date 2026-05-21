import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'business_application',
  versionKey: false,
})
export class BusinessApplication extends Document {
  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  passport: string;

  @Prop({ required: true })
  visitingCard: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  dateOfBirth: string;

  @Prop({ required: true })
  designation: string;

  @Prop({ required: true })
  companyType: string;

  @Prop({ required: true })
  officeLocation: string;

  @Prop({ required: true })
  travelPurpose: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  travelPlan: string;

  @Prop({ required: true })
  paymentMethod: string;

  @Prop({ required: true })
  createdBy: string;

  @Prop({ default: 'pending' })
  paymentStatus: string;

  @Prop({ default: 'pending' })
  applicationStatus: string;
}

export const BusinessApplicationSchema =
  SchemaFactory.createForClass(BusinessApplication);
