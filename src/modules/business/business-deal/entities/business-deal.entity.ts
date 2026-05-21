import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'business_deal', versionKey: false })
export class BusinessDeal extends Document {
  @Prop({ required: true })
  f_name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  c_name: string;

  @Prop({ required: true })
  c_email: string;

  @Prop({ required: true })
  c_address: string;

  @Prop({ required: true })
  payment_gateway: string;

  @Prop({ required: true })
  select_advise_time: string;

  @Prop({ required: true })
  select_adviser: string;

  @Prop({ required: true })
  payment_proof_type: string;

  @Prop({ default: '' })
  transaction_id: string;

  @Prop({ required: true })
  payment_photo: string;

  @Prop({ required: true })
  p_photo: string;

  @Prop({ required: true })
  service: string;

  @Prop({ required: true })
  serviceTitle: string;

  @Prop({ required: true })
  createdBy: string;

  @Prop({ default: 'pending' })
  applicationStatus: string;
}

export const BusinessDealSchema = SchemaFactory.createForClass(BusinessDeal);
