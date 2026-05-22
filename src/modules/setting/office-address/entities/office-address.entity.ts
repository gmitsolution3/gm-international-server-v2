import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ _id: false })
class AddressDetails {
  @Prop({ required: true })
  add: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: [String], required: true })
  phone: string[];

  @Prop({ required: true })
  image: string;
}

const AddressDetailsSchema = SchemaFactory.createForClass(AddressDetails);

export type OfficeAddressDocument = OfficeAddress & Document;

@Schema({
  timestamps: true,
  collection: 'office_address',
  versionKey: false,
})
export class OfficeAddress {
  @Prop({ required: true })
  country: string;

  @Prop({ type: [AddressDetailsSchema], required: true })
  address: AddressDetails[];
}

export const OfficeAddressSchema = SchemaFactory.createForClass(OfficeAddress);
