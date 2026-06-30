
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SearchingDocument = HydratedDocument<Searching>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Searching {
  @Prop({ required: true })
  service: string;

  @Prop({ required: true })
  query: string;

  @Prop()
  resultCount?: number;
}

export const SearchingSchema = SchemaFactory.createForClass(Searching);