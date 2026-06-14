import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { chatGatewayModule } from './chat-gateway/chat.module';

@Module({
  imports: [ChatModule, MessageModule, chatGatewayModule],
})
export class LiveChatModule {}
