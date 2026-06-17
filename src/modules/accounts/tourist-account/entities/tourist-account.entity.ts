import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TouristAccountDocument = TouristAccount & Document;

@Schema({ timestamps: true, collection: 'accountTAP', versionKey: false })
export class TouristAccount {
  @Prop({ required: true })
  clientName: string;

  @Prop({ required: true })
  destinationCountry: string;

  @Prop({ type: [String], required: true })
  coverageAreas: string[];

  @Prop({ required: true })
  clientPhone: string;

  @Prop({ required: true })
  passportNumber: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  numberOfGuests: number;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true })
  flyingDate: string;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  advance: number;

  @Prop({ required: true })
  due: number;

  @Prop({ required: true })
  submittedBy: string;

  @Prop({
    type: {
      email: { type: String, required: true },
      phone: { type: String },
      userRole: { type: String },
      branchName: { type: String },
    },
    required: true,
  })
  accountHolder: {
    email: string;
    phone: string;
    userRole: string;
    branchName: string;
  };
}

export const TouristAccountSchema =
  SchemaFactory.createForClass(TouristAccount);
