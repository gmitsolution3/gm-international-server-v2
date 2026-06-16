// chat/schema/chat.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({
  timestamps: true,
})
export class Chat {
  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({
    type: [Types.ObjectId],
    default: [],
  })
  adminIds: Types.ObjectId[];

  @Prop({
    enum: ['pending', 'accepted', 'closed'],
    default: 'pending',
  })
  status: string;
  userName: string;
  phone: string;

  @Prop()
  acceptedBy?: Types.ObjectId;

  @Prop()
  lastMessage?: string;

  @Prop()
  lastMessageAt?: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
