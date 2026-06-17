import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BusinessAccountDocument = BusinessAccount & Document;

@Schema({ timestamps: true, collection: 'accountBAP', versionKey: false })
export class BusinessAccount {
  @Prop({ required: true })
  clientName: string;

  @Prop({ required: true })
  clientPhone: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  officeLocation: string;

  @Prop({ required: true })
  passportNumber: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  advance: number;

  @Prop({ required: true })
  due: number;

  @Prop({ required: true })
  submittedBy: string;

  @Prop()
  remarks: string;

  // তোমার দেওয়া স্পেসিফিক accountHolder স্ট্রাকচার
  @Prop({
    type: {
      email: String,
      phone: String,
      userRole: String,
      branchName: String,
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

export const BusinessAccountSchema =
  SchemaFactory.createForClass(BusinessAccount);
