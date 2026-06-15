import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type B2BMedicalPkgDocument = B2BMedicalPkg & Document;

@Schema({ timestamps: true, collection: 'B2B_Medical', versionKey: false })
export class B2BMedicalPkg {
  @Prop({ type: String, required: true })
  action: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Package' }], required: true })
  packageIds: Types.ObjectId[];
}

export const B2BMedicalPkgSchema = SchemaFactory.createForClass(B2BMedicalPkg);
