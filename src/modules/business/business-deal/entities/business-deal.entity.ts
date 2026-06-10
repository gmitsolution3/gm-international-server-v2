import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BusinessDealDocument = BusinessDeal & Document;

@Schema({ timestamps: true, collection: 'business_deal', versionKey: false })
export class BusinessDeal {
  @Prop({ required: true })
  service: string;

  @Prop({ required: true })
  serviceTitle: string;

  @Prop({ required: true })
  createdBy: string;

  @Prop({ default: 'pending' })
  applicationStatus: string;

  @Prop({ type: Object })
  allFormData: Record<string, any>;
}

export const BusinessDealSchema = SchemaFactory.createForClass(BusinessDeal);
