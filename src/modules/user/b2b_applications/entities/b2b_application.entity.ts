import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type B2BApplicationDocument = B2BApplication & Document;

@Schema({ timestamps: true, collection: "B2BApplication", versionKey: false })
export class B2BApplication {
  @Prop({ required: true })
  address: string;

  @Prop({ default: 'pending' })
  applicationStatus: string;

  @Prop({ required: true })
  branchOfficeCount: string;

  @Prop({ required: true })
  businessStartDate: string;

  @Prop()
  createdBy?: string;

  @Prop({ required: true })
  dob: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  facebookPage: string;

  @Prop({ required: true })
  fatherName: string;

  @Prop()
  issueDate: string;

  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true })
  mobileNumber: string;

  @Prop({ required: true })
  motherName: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  nid: string;

  @Prop({ required: true })
  officeAddress: string;

  @Prop({ required: true })
  officeSize: string;

  @Prop({ required: true })
  organizationName: string;

  @Prop()
  passport: string;

  @Prop({ required: true })
  presentAddress: string;

  @Prop({ required: true })
  qualification: string;

  @Prop()
  tinNumber: string;

  @Prop()
  tradeLicenseNumber: string;

  @Prop()
  website?: string;
}

export const B2BApplicationSchema = SchemaFactory.createForClass(B2BApplication);