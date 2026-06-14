import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('messages') // Base route: /messages
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  // 1. New Message save/send korar jonno endpoint
  // POST /messages/send
  @Post('send')
  @HttpCode(HttpStatus.CREATED)
  async saveMessage(
    @Body()
    data: {
      chatId: string;
      senderId: string;
      senderRole: string;
      text: string;
    },
  ) {
    return await this.messageService.saveMessage(data);
  }

  // 2. Kono ekta specific chat-er shob message niye ashar jonno endpoint
  // GET /messages/:chatId
  @Get(':chatId')
  @HttpCode(HttpStatus.OK)
  async getMessages(@Param('chatId') chatId: string) {
    return await this.messageService.getMessages(chatId);
  }
}
