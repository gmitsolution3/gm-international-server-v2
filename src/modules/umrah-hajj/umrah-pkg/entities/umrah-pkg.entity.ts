import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Sub-document for Includes/Excludes items
@Schema({ _id: false })
class ValueItem {
  @Prop({ required: true, trim: true })
  value: string;
}
const ValueItemSchema = SchemaFactory.createForClass(ValueItem);

export type UmrahHajjPackageDocument = UmrahHajjPackage & Document;

@Schema({ timestamps: true, collection: 'umrahHajjPkg', versionKey: false })
export class UmrahHajjPackage {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, unique: true, trim: true })
  slug: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ type: [String], default: [] })
  gallery_image: string[];

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ min: 0, default: 0 })
  discount_price: number;

  @Prop({ required: true })
  departure_date: Date;

  @Prop({ required: true })
  return_date: Date;

  @Prop({ required: true, min: 0 })
  seats: number;

  @Prop({ type: [ValueItemSchema], default: [] })
  includes: ValueItem[];

  @Prop({ type: [ValueItemSchema], default: [] })
  excludes: ValueItem[];

  @Prop({
    required: true,
    enum: ['active', 'inactive', 'archived'],
    default: 'active',
  })
  package_status: string;

  @Prop({ required: true })
  description: string;
}

export const UmrahHajjPackageSchema =
  SchemaFactory.createForClass(UmrahHajjPackage);
