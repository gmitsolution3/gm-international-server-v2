import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoticeManagementDocument = NoticeManagement & Document;

@Schema({ timestamps: true, collection: 'notice', versionKey: false })
export class NoticeManagement {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: ['student', 'medical', 'tourist', 'business'] })
  noticeFor: string;
}

export const NoticeManagementSchema =
  SchemaFactory.createForClass(NoticeManagement);
