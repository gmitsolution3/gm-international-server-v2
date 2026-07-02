import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type VisaApplicationDocument = HydratedDocument<VisaApplication>;

@Schema({
  timestamps: true,
  strict: false,
  versionKey: false,
  collection: 'Visa_application',
})
export class VisaApplication {
  @Prop({
    type: MongooseSchema.Types.Mixed,
    default: {},
  })
  data: Record<string, any>;
}

export const VisaApplicationSchema =
  SchemaFactory.createForClass(VisaApplication);
