import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { chatGatewayModule } from './chat-gateway/chat.module';
import { SearchingModule } from './searching/searching.module';

@Module({
  imports: [ChatModule, MessageModule, chatGatewayModule, SearchingModule],
})
export class LiveChatModule {}
