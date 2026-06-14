import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './entities/message.entity';
import { Model } from 'mongoose';
import { Chat } from '../chat/entities/chat.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,

    @InjectModel(Chat.name)
    private readonly chatModel: Model<Chat>,
  ) {}

  async saveMessage(data: {
    chatId: string;
    senderId: string;
    senderRole: string;
    text: string;
  }) {
    const message = await this.messageModel.create(data);

    await this.chatModel.findByIdAndUpdate(data.chatId, {
      lastMessage: data.text,
      lastMessageAt: new Date(),
    });

    return message;
  }

  async getMessages(chatId: string) {
    return this.messageModel
      .find({
        chatId,
      })
      .sort({ createdAt: 1 });
  }
}
