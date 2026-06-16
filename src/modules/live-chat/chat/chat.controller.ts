import {
  Controller,
  Post,
  Patch,
  Body,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chats') // Base route: /chats
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // POST /chats/create
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createChat(
    @Body('userId')
    createChatDto: {
      userId: string;
      userName: string;
      phone: string;
    },
  ) {
    return await this.chatService.createChat(
      createChatDto.userId,
      createChatDto.userName,
      createChatDto.phone,
    );
  }

  @Patch(':id/accept')
  @HttpCode(HttpStatus.OK)
  async acceptChat(
    @Param('id') chatId: string,
    @Body('adminId') adminId: string,
  ) {
    return await this.chatService.acceptChat(chatId, adminId);
  }
}
