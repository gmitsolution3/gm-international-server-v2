import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BusinessPackage } from '../../../business/business-package/entities/business-package.entity';

export type B2BBusinessPkgDocument = B2BBusinessPkg & Document;

@Schema({ timestamps: true, collection: 'B2B_Business', versionKey: false }) // Er fole createdAt ebong updatedAt auto-handle hobe
export class B2BBusinessPkg {
  @Prop({ type: String, required: true })
  action: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: BusinessPackage.name }],
    required: true,
  })
  packageIds: Types.ObjectId[];
}

export const B2BBusinessPkgSchema =
  SchemaFactory.createForClass(B2BBusinessPkg);
