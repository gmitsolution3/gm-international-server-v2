// export class VisaFrom {}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type VisaFromDocument = HydratedDocument<VisaFrom>;

@Schema({ timestamps: true, versionKey: false, collection: 'Visa_form' })
export class VisaFrom {
  @Prop()
  title: string;

  @Prop()
  subTitle: string;

  @Prop({
    type: [MongooseSchema.Types.Mixed],
    default: [],
  })
  formData: Record<string, any>[];
}

export const VisaFromSchema = SchemaFactory.createForClass(VisaFrom);




export type VisaFileDocument = HydratedDocument<VisaFile>;

@Schema({ timestamps: true, versionKey: false, collection: 'Visa_file' })
export class VisaFile {
  @Prop()
  title: string;

  @Prop()
  subTitle: string;

  @Prop({
    type: [MongooseSchema.Types.Mixed],
    default: [],
  })
  fileData: Record<string, any>[];
}

export const VisaFileSchema = SchemaFactory.createForClass(VisaFile);
