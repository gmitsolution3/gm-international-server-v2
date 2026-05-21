import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class MedicalApplication extends Document {
  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  hospital_name: string;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  patientName: string;

  @Prop({ required: true })
  patient_age: string;

  @Prop({ required: true })
  patient_gender: string;

  @Prop({ required: true })
  patient_disease: string;

  @Prop({ required: true })
  disease_duration: string;

  @Prop({ required: true })
  contactNumber: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: [String], required: true })
  medical_report: string[];

  @Prop({ required: true })
  recent_photo: string;

  @Prop({ required: true })
  passport_copy: string;

  @Prop({ required: true })
  payment: string;

  @Prop({ required: true })
  destinationCountry: string;

  @Prop({ required: true })
  destinationCity: string;

  @Prop({ required: true })
  createdBy: string;

  @Prop({ default: 'Pending' }) 
  paymentStatus: string;

  @Prop({ default: 'pending' }) 
  appointmentStatus: string;

  @Prop({ required: true })
  package_id: string;

  @Prop({ default: Date.now })
  paidAt: Date;

  @Prop({ required: true })
  paymentMethod: string;

  @Prop({ required: true })
  paymentScreenshot: string;

  @Prop({ required: true })
  transactionId: string;
}

export const MedicalApplicationSchema =
  SchemaFactory.createForClass(MedicalApplication);
