import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private readonly chatModel: Model<Chat>,
  ) {}

  async createChat(userId: string, userName: string, phone: string) {
    return await this.chatModel.create({
      userId,
      userName,
      phone,
      status: 'pending',
    });
  }

  async acceptChat(chatId: string, adminId: string) {
    return await this.chatModel.findByIdAndUpdate(
      chatId,
      {
        status: 'accepted',
        acceptedBy: adminId,
        $addToSet: {
          adminIds: adminId,
        },
      },
      { new: true },
    );
  }

  async getAdminActiveChats(adminId: string) {
    return await this.chatModel
      .find({
        acceptedBy: adminId,
        status: 'accepted',
      })
      .select('userId status lastMessage lastMessageAt updatedAt')
      .sort({ updatedAt: -1 })
      .limit(20);
  }

  async checkExistingChat(userId: string) {
    return await this.chatModel
      .findOne({
        userId: userId,
        status: { $in: ['pending', 'accepted'] },
      })
      .sort({ createdAt: -1 });
  }
}
