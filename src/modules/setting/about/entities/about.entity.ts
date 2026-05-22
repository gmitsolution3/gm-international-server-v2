import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AboutDocument = About & Document;

@Schema({collection: 'office_team', versionKey: false} ) 
export class About {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  bio: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, type: Number })
  order_index: number;

  @Prop({ required: true, type: Date })
  createdAt: Date;

  @Prop({ required: true, type: Date })
  updateAt: Date;
}

export const AboutSchema = SchemaFactory.createForClass(About);
