import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MedAccountDocument = MedAccount & Document;

@Schema({ timestamps: true, collection: 'accountMAP', versionKey: false })
export class MedAccount {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  hospitalName: string;

  @Prop({ required: true })
  countryName: string;

  @Prop({ required: true })
  patientAge: number;

  @Prop({ required: true })
  patientDisease: string;

  @Prop({ required: true })
  patientPhone: string;

  @Prop({ required: true })
  flyingDate: string;

  @Prop({ required: true })
  totalAmount: number;
  @Prop({
    type: {
      email: String,
      phone: String,
      userRole: String,
      branchName: String,
    },
  })
  accountHolder: {
    email: string;
    phone: string;
    userRole: string;
    branchName: string;
  };

  @Prop({ required: true })
  advance: number;

  @Prop({ required: true })
  due: number;

  @Prop({ required: true })
  submittedBy: string;
}

export const MedAccountSchema = SchemaFactory.createForClass(MedAccount);
