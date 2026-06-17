import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VisaAccountDocument = VisaAccount & Document;

@Schema({ collection: 'accountVAP', timestamps: true, versionKey: false })
export class VisaAccount {
  @Prop({ required: true })
  clientName: string;

  @Prop({ required: true })
  clientPhone: string;

  @Prop({ required: true })
  passportNumber: string;

  @Prop({ required: true })
  dateOfBirth: string;

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

export const VisaAccountSchema = SchemaFactory.createForClass(VisaAccount);
