import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from '../chat/entities/chat.entity';
import { Message, MessageSchema } from '../message/entities/message.entity';
import { ChatService } from '../chat/chat.service';
import { MessageService } from '../message/message.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [ChatGateway, ChatService, MessageService],
})
export class chatGatewayModule {}
