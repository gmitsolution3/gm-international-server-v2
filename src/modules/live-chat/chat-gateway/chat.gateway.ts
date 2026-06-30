import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatService } from '../chat/chat.service';
import { MessageService } from '../message/message.service';
import { Chat } from '../chat/entities/chat.entity';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private adminSockets: Map<string, string[]> = new Map();
  private userSockets: Map<string, string[]> = new Map();

  constructor(
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
  ) {}

  async handleConnection(client: Socket) {
   
    const userId = client.handshake.query.userId as string;
    const role = client.handshake.query.role as string;
    const adminId = client.handshake.query.adminId as string;



    if (userId && role !== 'admin' && role !== 'office_admin') {
      client.join(`user:${userId}`);

      if (!this.userSockets.has(userId)) {
        this.userSockets.set(userId, []);
      }
      this.userSockets.get(userId)?.push(client.id);
      // Check for existing chat immediately on connection
      await this.checkAndJoinExistingChat(client, userId);

    
    }

    if (role === 'admin' || role === 'office_admin') {
      client.join('admins');

      if (adminId) {
        client.join(`admin:${adminId}`);
        if (!this.adminSockets.has(adminId)) {
          this.adminSockets.set(adminId, []);
        }
        this.adminSockets.get(adminId)?.push(client.id);

        // Send pending and active chats to admin on connection
        await this.sendAdminDashboard(client, adminId);
      }

     
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId as string;
    const adminId = client.handshake.query.adminId as string;
    const role = client.handshake.query.role as string;

    

    if (userId) {
      const sockets = this.userSockets.get(userId) || [];
      const index = sockets.indexOf(client.id);
      if (index > -1) {
        sockets.splice(index, 1);
      }
      if (sockets.length === 0) {
        this.userSockets.delete(userId);
      }
    }

    if (adminId && (role === 'admin' || role === 'office_admin')) {
      const sockets = this.adminSockets.get(adminId) || [];
      const index = sockets.indexOf(client.id);
      if (index > -1) {
        sockets.splice(index, 1);
      }
      if (sockets.length === 0) {
        this.adminSockets.delete(adminId);
      }
    }
  }

  // Helper method to check and join existing chat
  private async checkAndJoinExistingChat(client: Socket, userId: string) {
    try {
      const existingChat = await this.chatModel
        .findOne({
          userId: userId,
          status: { $in: ['pending', 'accepted'] },
        })
        .sort({ createdAt: -1 });

      if (existingChat) {
        client.join(`chat:${existingChat._id}`);
       
      }
    } catch (error) {
      console.error('Error checking existing chat:', error);
    }
  }

  // Helper method to send admin dashboard data
  private async sendAdminDashboard(client: Socket, adminId: string) {
    try {

      const pendingChats = await this.chatModel
        .find({
          status: 'pending',
          $or: [{ acceptedBy: { $exists: false } }, { acceptedBy: null }],
        })
        .sort({ createdAt: -1 });

      
      const activeChats = await this.chatModel
        .find({
          acceptedBy: adminId,
          status: 'accepted',
        })
        .select(
          'userId status userName phone lastMessage lastMessageAt updatedAt',
        )
        .sort({ updatedAt: -1 });

      client.emit('pendingChats', pendingChats);

      // Send both to admin
      client.emit('pendingChats', pendingChats);
      client.emit('activeChats', activeChats);

    } catch (error) {
      console.error('Error sending admin dashboard:', error);
    }
  }

  @SubscribeMessage('checkExistingChat')
  async handleCheckExistingChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { userId: string },
  ) {
    try {
      const existingChat = await this.chatModel
        .findOne({
          userId: payload.userId,
          status: { $in: ['pending', 'accepted'] },
        })
        .sort({ createdAt: -1 });

      if (existingChat) {
        client.join(`chat:${existingChat._id}`);

        client.emit('existingChat', {
          chatId: existingChat._id,
          status: existingChat.status,
        });

        if (existingChat.status === 'accepted' && existingChat.acceptedBy) {
          this.server
            .to(`admin:${existingChat.acceptedBy}`)
            .emit('userReconnected', {
              chatId: existingChat._id,
              userId: payload.userId,
            });
        }
      }
    } catch (error) {
      console.error('Error checking existing chat:', error);
    }
  }

  @SubscribeMessage('getActiveChats')
  async handleGetActiveChats(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { adminId: string },
  ) {
    try {
      await this.sendAdminDashboard(client, payload.adminId);
    } catch (error) {
      console.error('Error getting active chats:', error);
    }
  }

  @SubscribeMessage('userKnock')
  async handleUserKnock(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload: { userId: string; userName?: string; phone?: string },
  ) {
    try {
      // Check if already has pending or active chat
      const existingChat = await this.chatModel.findOne({
        userId: payload.userId,
        status: { $in: ['pending', 'accepted'] },
      });

      if (existingChat) {
        client.join(`chat:${existingChat._id}`);
        client.emit('existingChat', {
          chatId: existingChat._id,
          status: existingChat.status,
        });
        return {
          success: true,
          chatId: existingChat._id,
          status: existingChat.status,
        };
      }

  

      // Create new chat with user info
      const chat: any = await this.chatService.createChat(
        payload.userId,
        payload.userName,
        payload.phone,
      );



      client.join(`chat:${chat._id}`);

      // Notify all admins about new request
      this.server.to('admins').emit('newChatRequest', {
        chatId: chat._id,
        userId: payload.userId,
        userName: payload.userName || 'Unknown',
        phone: payload.phone || 'Not provided',
        message: 'নতুন চ্যাট রিকোয়েস্ট এসেছে',
        createdAt: chat.createdAt,
      });

      return {
        success: true,
        chatId: chat._id,
        status: chat.status,
      };
    } catch (error) {
      console.error('Error creating chat:', error);
      return {
        success: false,
        error: 'চ্যাট তৈরি করতে সমস্যা হয়েছে',
      };
    }
  }

  @SubscribeMessage('adminAcceptChat')
  async handleAdminAcceptChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { chatId: string; adminId: string },
  ) {
    try {
      const chat = await this.chatService.acceptChat(
        payload.chatId,
        payload.adminId,
      );

      // Admin joins the specific chat room
      client.join(`chat:${payload.chatId}`);

      // Notify user
      this.server.to(`user:${chat.userId}`).emit('chatAccepted', {
        chatId: chat._id,
        adminId: payload.adminId,
        message: 'আপনার চ্যাট রিকোয়েস্ট একসেপ্ট হয়েছে',
      });

      // Ensure user is in chat room
      const userSockets = this.userSockets.get(chat.userId.toString());
      if (userSockets) {
        userSockets.forEach((socketId) => {
          const socket = this.server.sockets.sockets.get(socketId);
          if (socket) {
            socket.join(`chat:${payload.chatId}`);
          }
        });
      }

      // Notify other admins that chat is taken
      client.to('admins').emit('chatTaken', {
        chatId: payload.chatId,
        adminId: payload.adminId,
      });

      // Refresh pending chats for all admins
      const pendingChats = await this.chatModel
        .find({
          status: 'pending',
          acceptedBy: { $exists: false },
        })
        .populate('userId', 'name phone email')
        .sort({ createdAt: -1 });

      this.server.to('admins').emit('pendingChats', pendingChats);

      return {
        success: true,
        chat: chat,
      };
    } catch (error) {
      console.error('Error accepting chat:', error);
      return {
        success: false,
        error: 'চ্যাট একসেপ্ট করতে সমস্যা হয়েছে',
      };
    }
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload: {
      chatId: string;
      senderId: string;
      senderRole: 'user' | 'admin';
      text: string;
    },
  ) {
    try {
      const message: any = await this.messageService.saveMessage({
        chatId: payload.chatId,
        senderId: payload.senderId,
        senderRole: payload.senderRole,
        text: payload.text,
      });

      // Ensure sender is in the chat room
      client.join(`chat:${payload.chatId}`);

      // Broadcast to the SPECIFIC chat room only
      this.server.to(`chat:${payload.chatId}`).emit('receiveMessage', {
        _id: message._id,
        chatId: message.chatId,
        senderId: message.senderId,
        senderRole: message.senderRole,
        text: message.text,
        createdAt: message.createdAt,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
      });

      // If user sends message and admin might be offline
      if (payload.senderRole === 'user') {
        const chat = await this.chatModel.findById(payload.chatId);
        if (chat && chat.acceptedBy) {
          const adminOnline = this.adminSockets.has(chat.acceptedBy.toString());
          if (!adminOnline) {
 
            // Notify all admins as backup
            this.server.to('admins').emit('adminNotification', {
              title: 'নতুন মেসেজ!',
              body: `User: ${payload.text.substring(0, 50)}${payload.text.length > 50 ? '...' : ''}`,
              chatId: payload.chatId,
            });
          }
        } else if (chat && !chat.acceptedBy) {
          // Chat is pending, notify all admins
          this.server.to('admins').emit('adminNotification', {
            title: 'পেন্ডিং চ্যাটে নতুন মেসেজ!',
            body: `User: ${payload.text.substring(0, 50)}${payload.text.length > 50 ? '...' : ''}`,
            chatId: payload.chatId,
          });
        }
      }

      return {
        success: true,
        message: message,
      };
    } catch (error) {
      console.error('Error sending message:', error);
      return {
        success: false,
        error: 'মেসেজ পাঠাতে সমস্যা হয়েছে',
      };
    }
  }

  @SubscribeMessage('typing')
  handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload: {
      chatId: string;
      userId: string;
      userName?: string;
      isTyping: boolean;
    },
  ) {
    // Broadcast typing to specific chat room (excluding sender)
    client.to(`chat:${payload.chatId}`).emit('userTyping', {
      userId: payload.userId,
      userName: payload.userName,
      isTyping: payload.isTyping,
    });
  }

  @SubscribeMessage('loadChatHistory')
  async handleLoadChatHistory(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { chatId: string },
  ) {
    try {
      const messages = await this.messageService.getMessages(payload.chatId);

      // Ensure client is in this chat room
      client.join(`chat:${payload.chatId}`);

      client.emit('chatHistory', {
        chatId: payload.chatId,
        messages: messages,
      });

      return {
        success: true,
        messages: messages,
      };
    } catch (error) {
      console.error('Error loading chat history:', error);
      return {
        success: false,
        error: 'চ্যাট হিস্ট্রি লোড করতে সমস্যা হয়েছে',
      };
    }
  }
}
