import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TouristPackage } from '../../../tourist/tourist-package/entities/tourist-package.entity';

export type TouristPkgDocument = B2BTouristPkg & Document;

@Schema({ timestamps: true, collection: 'B2B_Tourist', versionKey: false })
export class B2BTouristPkg {
  @Prop({ type: String, required: true, default: 'assign_to_b2b' })
  action: string;
  @Prop({
    type: [{ type: Types.ObjectId, ref: TouristPackage.name }],
    required: true,
  })
  packageIds: Types.ObjectId[];
}

export const B2BTouristPkgSchema = SchemaFactory.createForClass(B2BTouristPkg);
