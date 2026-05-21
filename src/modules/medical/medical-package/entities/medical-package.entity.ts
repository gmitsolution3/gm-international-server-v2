import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'medical_package',
  versionKey: false,
})
export class MedicalPackage extends Document {
  @Prop({ required: true })
  hospital_name: string;

  @Prop({ required: true })
  country_name: string;

  @Prop({ required: true })
  city_name: string;

  @Prop({ required: true })
  provience: string;

  @Prop({ required: true })
  photo: string;

  @Prop({ required: true })
  hospital_type: string;

  @Prop({ type: [String], required: true })
  department: string[];

  @Prop({ required: true })
  description: string;

  @Prop({ default: 0 })
  total_view: number;

  @Prop({ default: 0 })
  total_sell: number;

  @Prop({ required: true })
  createdBy: string;

  @Prop({ default: 5 })
  rating: number;
}

export const MedicalPackageSchema =
  SchemaFactory.createForClass(MedicalPackage);
