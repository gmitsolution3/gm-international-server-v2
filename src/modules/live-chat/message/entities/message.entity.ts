// message/schema/message.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema({
  timestamps: true,
})
export class Message {
  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  chatId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  senderId: Types.ObjectId;

  @Prop({
    enum: ['user', 'admin'],
    required: true,
  })
  senderRole: string;

  @Prop({
    default: 0,
  })
  unreadCount: number;

  @Prop({
    default: false,
  })
  isTyping: boolean;

  @Prop({
    required: true,
  })
  text: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
