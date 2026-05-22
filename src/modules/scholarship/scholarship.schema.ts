import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScholarshipDocument = ScholarshipPackage & Document;
@Schema({
  timestamps: true,
  collection: 'scholarship_packages',
  versionKey: false,
}) //old database er name ->"scholarship_package_management"
export class ScholarshipPackage {
  @Prop({ type: Boolean, default: false })
  isInternationalStudent: boolean;

  @Prop({ required: true, trim: true })
  universityName: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  city: string;

  @Prop()
  universityURL: string;

  @Prop()
  thumbnail: string;

  @Prop()
  startingDate: string;

  @Prop()
  deadline: string;

  @Prop()
  duration: string;

  @Prop()
  language: string;

  @Prop()
  applicationFee: string;

  @Prop()
  serviceFee: string;

  @Prop()
  description: string;

  @Prop({ type: [String], default: [] })
  programs: string[];

  @Prop()
  universityDescription: string;

  @Prop({ default: 'active' })
  status: string;

  @Prop({ default: '' })
  universityVideoLink: string;

  @Prop({ type: Boolean, default: false })
  b2b: boolean;

  @Prop()
  b2bPrice: string;
}

export const ScholarshipPkgSchema =
  SchemaFactory.createForClass(ScholarshipPackage);
