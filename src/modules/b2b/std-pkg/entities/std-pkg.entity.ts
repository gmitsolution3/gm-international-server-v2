import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StdPkgDocument = B2BStdPkg & Document;

@Schema({ timestamps: true, collection: 'B2B_Student', versionKey: false })
export class B2BStdPkg {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Package' }], required: true })
  packageId: Types.ObjectId[];

  @Prop({ type: Number, required: true, default: 0 })
  packageCount: number;
}

export const B2BB2BStdPkgSchema = SchemaFactory.createForClass(B2BStdPkg);
