import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TouristPackageDocument = TouristPackage & Document;

@Schema({ timestamps: true, collection: 'tourist_packages', versionKey: false })
export class TouristPackage {
  @Prop({ required: true })
  p_title: string;

  @Prop({ required: true })
  p_price: string;

  @Prop({ required: true })
  number_of_member: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true, default: false })
  is_with_air_ticket: boolean;

  @Prop({ required: true })
  start_form: string;

  @Prop({ type: [String], default: [] })
  includes: string[];

  @Prop({ type: [String], default: [] })
  excludes: string[];

  @Prop({ type: [String], default: [] })
  country: string[];

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ type: [String], default: [] })
  gallery: string[];

  @Prop({
    type: [{ destination: String, sub_destination: [String] }],
    default: [],
  })
  tour_plan: Record<string, any>[];

  @Prop({ required: true })
  createdBy: string;

  @Prop({ required: false, default: false })
  isB2B?: boolean;

  @Prop({ required: false, default: '0' })
  b2b_price?: string;

  @Prop({ required: false, default: false })
  isInternationalPackage?: boolean;

  @Prop({ required: false, default: '0' })
  international_package_price?: string;

  @Prop({ required: true })
  description: string;
}

export const TouristPackageSchema =
  SchemaFactory.createForClass(TouristPackage);
