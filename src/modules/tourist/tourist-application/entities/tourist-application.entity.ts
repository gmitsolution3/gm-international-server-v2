import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TouristApplicationDocument = TouristApplication & Document;

// Guests Child Schema
@Schema({ _id: false })
class Guests {
  @Prop({ type: Number, required: true, default: 1 })
  adults: number;

  @Prop({ type: Number, required: true, default: 0 })
  children: number;

  @Prop({ type: Number, required: true, default: 0 })
  infants: number;
}

// PackageInfo Child Schema
@Schema({ _id: false })
class PackageInfo {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true })
  packageName: string;
}

// Location Child Schema
@Schema({ _id: false })
class Location {
  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  destinationPlace: string;

  @Prop({ required: false, default: '' })
  subDestination?: string;
}

// DurationAndDates Child Schema
@Schema({ _id: false })
class DurationAndDates {
  @Prop({ required: true })
  duration: string;

  @Prop({ required: true })
  dateFrom: string;

  @Prop({ required: true })
  startForm: string; // JSON e 'startForm' chilo
}

// IncludesAndExcludes Child Schema
@Schema({ _id: false })
class IncludesAndExcludes {
  @Prop({ type: [String], default: [] })
  includes: string[];

  @Prop({ type: [String], default: [] })
  excludes: string[];
}

// Client Child Schema
@Schema({ _id: false })
class ClientInfo {
  @Prop({ required: true })
  b2bId: string;

  @Prop({ required: true })
  form: string;
}

@Schema({ timestamps: true, collection: 'tourist_app', versionKey: false })
export class TouristApplication {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  passportNumber: string;

  @Prop({ required: true })
  visaStatus: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ type: Guests, required: true })
  guests: Guests;

  @Prop({ required: true })
  airTicket: string;

  @Prop({ type: [String], default: [] })
  foodPlan: string[];

  @Prop({ type: [String], default: [] })
  transportation: string[];

  @Prop({ type: [String], default: [] })
  hotelCategory: string[];

  @Prop({ required: true })
  paymentMethod: string;

  @Prop({ required: true })
  passportVisaImage: string;

  @Prop({ required: true })
  createdBy: string;

  @Prop({ type: PackageInfo, required: true })
  packageInfo: PackageInfo;

  @Prop({ type: Location, required: true })
  location: Location;

  @Prop({ type: DurationAndDates, required: true })
  durationAndDates: DurationAndDates;

  @Prop({ required: true })
  totalCost: string;

  @Prop({ required: false, default: false })
  isInternationalPackage?: boolean;

  @Prop({ type: IncludesAndExcludes, required: true })
  includesAndExcludes: IncludesAndExcludes;

  @Prop({ type: ClientInfo, required: true })
  client: ClientInfo;
}

export const TouristApplicationSchema =
  SchemaFactory.createForClass(TouristApplication);
