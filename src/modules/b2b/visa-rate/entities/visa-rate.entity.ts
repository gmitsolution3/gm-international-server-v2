// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type VisaRateDocument = VisaRate & Document;

// // Sub-schema for DocItem
// @Schema({ _id: false }) // Array item e alada automatic ID na chaile false rakhun
// class DocItem {
//   @Prop({ type: String, required: true })
//   value: string;
// }
// const DocItemSchema = SchemaFactory.createForClass(DocItem);

// // Main Pricing Object Schema
// @Schema({ _id: false })
// class Pricing {
//   @Prop({ type: Number, required: true })
//   b2b: number;

//   @Prop({ type: Number, required: true })
//   b2c: number;
// }
// const PricingSchema = SchemaFactory.createForClass(Pricing);

// // starting point
// @Schema({ timestamps: true, collection: 'b2b_visa_rate', versionKey: false }) // Auto createdAt o updatedAt generate hobe
// export class VisaRate {
//   @Prop({ type: String, required: true })
//   country: string;

//   @Prop({ type: String, required: true })
//   visaType: string;

//   @Prop({ type: String, required: true })
//   processingTime: string;

//   @Prop({ type: PricingSchema, required: true })
//   pricing: Pricing;

//   @Prop({ type: String, required: true })
//   validity: string;

//   @Prop({ type: [DocItemSchema], required: true })
//   basicDocuments: DocItem[];

//   @Prop({ type: [DocItemSchema], required: false })
//   businessDocuments?: DocItem[];

//   @Prop({ type: [DocItemSchema], required: false })
//   jobHolderDocuments?: DocItem[];

//   @Prop({ type: [DocItemSchema], required: false })
//   studentDocuments?: DocItem[];

//   @Prop({ type: [DocItemSchema], required: false })
//   coupleDocuments?: DocItem[];

//   @Prop({ type: String, required: false })
//   otherInformation?: string;
// }

// export const VisaRateSchema = SchemaFactory.createForClass(VisaRate);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VisaRateDocument = VisaRate & Document;

// Main Pricing Object Schema
@Schema({ _id: false })
class Pricing {
  @Prop({ type: Number, required: true })
  b2b: number;

  @Prop({ type: Number, required: true })
  b2c: number;
}
const PricingSchema = SchemaFactory.createForClass(Pricing);

// Main schema
@Schema({ timestamps: true, collection: 'b2b_visa_rate', versionKey: false })
export class VisaRate {
  @Prop({ type: String, required: true })
  country: string;

  @Prop({ type: String, required: true })
  visaType: string;

  @Prop({ type: String, required: true })
  processingTime: string;

  @Prop({ type: PricingSchema, required: true })
  pricing: Pricing;

  @Prop({ type: String, required: true })
  validity: string;

  @Prop({ type: [String], required: true })
  basicDocuments: string[];

  @Prop({ type: [String], required: false })
  businessDocuments?: string[];

  @Prop({ type: [String], required: false })
  jobHolderDocuments?: string[];

  @Prop({ type: [String], required: false })
  studentDocuments?: string[];

  @Prop({ type: [String], required: false })
  coupleDocuments?: string[];

  @Prop({ type: String, required: false })
  otherInformation?: string;
}

export const VisaRateSchema = SchemaFactory.createForClass(VisaRate);