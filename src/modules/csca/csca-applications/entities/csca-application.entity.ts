import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CscaApplicationDocument = CscaApplication & Document;

@Schema({
  timestamps: true,
  collection: 'CSCA_Applications',
  versionKey: false,
})
export class CscaApplication {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  presentAddress: string;

  @Prop({ required: true })
  permanentAddress: string;

  @Prop({ required: true })
  lastQualification: string;

  @Prop({ required: true })
  instituteName: string;

  @Prop({ required: true })
  passingYear: string;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  certificateUrl: string;

  @Prop({ required: true })
  photoUrl: string;

  @Prop({ required: true })
  passportUrl: string;

  @Prop({ required: true })
  nidUrl: string;

  @Prop({ required: false })
  paymentMethod?: string;

  @Prop({ required: false })
  transactionId?: string;

  @Prop({ required: false })
  paymentReceiptUrl: string;

  @Prop({ required: false, default: null })
  userEmail?: string;
}

export const CscaApplicationSchema =
  SchemaFactory.createForClass(CscaApplication);
