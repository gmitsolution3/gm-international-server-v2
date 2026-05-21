import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TouristQueryDocument = TouristQuery & Document;

@Schema({ timestamps: true, collection: 'tourist_custom_app', versionKey: false }) // Automatically handles createdAt and updatedAt
export class TouristQuery {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  visaStatus: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  airTicket: string;

  @Prop({ required: true })
  destinationCountry: string;

  @Prop({ required: true })
  destinationPlace: string;

  @Prop({ required: true })
  days: string;

  @Prop({ required: true })
  nights: string;

  @Prop({ type: [String], default: [] })
  food: string[];

  @Prop({ required: true })
  transportation: string;

  @Prop({ required: true })
  dateFrom: string;

  @Prop({ required: true })
  dateTo: string;

  @Prop({ required: false, default: '' }) // Provided as empty string in JSON
  hotelCategory?: string;

  @Prop({ required: true })
  passportVisaFile: string;
}

export const TouristQuerySchema = SchemaFactory.createForClass(TouristQuery);
