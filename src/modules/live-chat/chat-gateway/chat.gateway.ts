// import {
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';

// @WebSocketGateway({
//   cors: {
//     origin: '*',
//   },
// })
// export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   server: Server;

//   handleConnection(client: Socket) {
//     console.log(`Client connected: ${client.id}`);
//     const role = client.handshake.query.role;
//     const adminEmail = client.handshake.query.adminEmail;
//     console.log({ role, adminEmail });

//     if (role === 'admin' || role === 'office_admin') {
//       client.join('admins');
//       console.log(`Admin ${client.id} joined the admin room.`);
//     }
//   }

//   handleDisconnect(client: Socket) {
//     const role = client.handshake.query.role;
//     const adminEmail = client.handshake.query.adminEmail;
//     console.log(`Client disconnected: ${client.id}`);
//     console.log({ role, adminEmail });
//   }

//   @SubscribeMessage('sendMessage')
//   handleMessage(client: Socket, payload: { sender: string; text: string }) {
//     console.log('Received message:', payload);
//     this.server.emit('receiveMessage', {
//       sender: 'admin',
//       text: 'Well done message send success',
//       time: new Date().toLocaleTimeString([], {
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true,
//       }),
//     });

//     if (payload.sender === 'user') {
//       this.server.to('admins').emit('adminNotification', {
//         title: 'নতুন মেসেজ এসেছে!',
//         body: payload.text,
//         sender: payload.sender,
//       });

//       // ৩. ব্যাকগ্রাউন্ডে ইমেইল বা পুশ নোটিফিকেশন ট্রিগার করা
//       // try {
//       //   await this.sendEmailToAdmins(payload.text);
//       //   await this.sendPushNotification(payload.text);
//       // } catch (error) {
//       //   console.error('Notification error:', error);
//       // }
//     }
//   }
// }

// import {
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   ConnectedSocket,
//   MessageBody,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { ChatService } from '../chat/chat.service';
// import { MessageService } from '../message/message.service';

// @WebSocketGateway({
//   cors: {
//     origin: '*',
//   },
// })
// export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   server: Server;

//   // সার্ভিস ইনজেক্ট করুন
//   constructor(
//     private readonly chatService: ChatService,
//     private readonly messageService: MessageService,
//   ) {}

//   handleConnection(client: Socket) {
//     console.log(`Client connected: ${client.id}`);
//     const userId = client.handshake.query.userId as string;
//     const role = client.handshake.query.role as string;
//     const adminEmail = client.handshake.query.adminEmail as string;

//     console.log({ userId, role, adminEmail });

//     // ইউজার তার নিজের রুমে জয়েন করবে
//     if (userId) {
//       client.join(`user:${userId}`);
//       console.log(`User ${userId} joined room user:${userId}`);
//     }

//     // অ্যাডমিনরা অ্যাডমিন রুমে জয়েন করবে
//     if (role === 'admin' || role === 'office_admin') {
//       client.join('admins');
//       console.log(`Admin ${client.id} joined the admin room.`);
//     }
//   }

//   handleDisconnect(client: Socket) {
//     const userId = client.handshake.query.userId as string;
//     const role = client.handshake.query.role as string;
//     console.log(`Client disconnected: ${client.id}`);
//     console.log({ userId, role });
//   }

//   // ইউজার নক করলে চ্যাট রুম তৈরি করা
//   @SubscribeMessage('userKnock')
//   async handleUserKnock(
//     @ConnectedSocket() client: Socket,
//     @MessageBody() payload: { userId: string },
//   ) {
//     try {
//       // 1. নতুন চ্যাট তৈরি করা
//       const chat:any = await this.chatService.createChat(payload.userId);

//       // 2. ইউজারকে তার চ্যাট রুমে জয়েন করানো
//       client.join(`chat:${chat._id}`);

//       // 3. সব অ্যাডমিনকে নোটিফিকেশন পাঠানো
//       this.server.to('admins').emit('newChatRequest', {
//         chatId: chat._id,
//         userId: payload.userId,
//         message: 'নতুন চ্যাট রিকোয়েস্ট এসেছে',
//         createdAt: chat.createdAt,
//       });

//       return {
//         success: true,
//         chatId: chat._id,
//         status: chat.status,
//       };
//     } catch (error) {
//       console.error('Error creating chat:', error);
//       return {
//         success: false,
//         error: 'চ্যাট তৈরি করতে সমস্যা হয়েছে',
//       };
//     }
//   }

//   // অ্যাডমিন চ্যাট একসেপ্ট করলে
//   @SubscribeMessage('adminAcceptChat')
//   async handleAdminAcceptChat(
//     @ConnectedSocket() client: Socket,
//     @MessageBody() payload: { chatId: string; adminId: string },
//   ) {
//     try {
//       // 1. চ্যাট স্ট্যাটাস আপডেট করা
//       const chat = await this.chatService.acceptChat(
//         payload.chatId,
//         payload.adminId,
//       );

//       // 2. অ্যাডমিনকে চ্যাট রুমে জয়েন করানো
//       client.join(`chat:${payload.chatId}`);

//       // 3. ইউজারকে নোটিফাই করা যে তার চ্যাট একসেপ্ট হয়েছে
//       this.server.to(`user:${chat.userId}`).emit('chatAccepted', {
//         chatId: chat._id,
//         adminId: payload.adminId,
//         message: 'আপনার চ্যাট রিকোয়েস্ট একসেপ্ট হয়েছে',
//       });

//       // 4. অন্য অ্যাডমিনদের নোটিফাই করা যে চ্যাটটি নেওয়া হয়েছে
//       client.to('admins').emit('chatTaken', {
//         chatId: payload.chatId,
//         adminId: payload.adminId,
//       });

//       return {
//         success: true,
//         chat: chat,
//       };
//     } catch (error) {
//       console.error('Error accepting chat:', error);
//       return {
//         success: false,
//         error: 'চ্যাট একসেপ্ট করতে সমস্যা হয়েছে',
//       };
//     }
//   }

//   // মেসেজ পাঠানো
//   @SubscribeMessage('sendMessage')
//   async handleMessage(
//     @ConnectedSocket() client: Socket,
//     @MessageBody()
//     payload: {
//       chatId: string;
//       senderId: string;
//       senderRole: 'user' | 'admin';
//       text: string;
//     },
//   ) {
//     try {
//       // 1. মেসেজ ডাটাবেজে সেভ করা
//       const message:any = await this.messageService.saveMessage({
//         chatId: payload.chatId,
//         senderId: payload.senderId,
//         senderRole: payload.senderRole,
//         text: payload.text,
//       });

//       // 2. মেসেজ শুধুমাত্র সেই চ্যাট রুমের সবাইকে পাঠানো
//       this.server.to(`chat:${payload.chatId}`).emit('receiveMessage', {
//         _id: message._id,
//         chatId: message.chatId,
//         senderId: message.senderId,
//         senderRole: message.senderRole,
//         text: message.text,
//         createdAt: message.createdAt,
//         time: new Date().toLocaleTimeString([], {
//           hour: '2-digit',
//           minute: '2-digit',
//           hour12: true,
//         }),
//       });

//       return {
//         success: true,
//         message: message,
//       };
//     } catch (error) {
//       console.error('Error sending message:', error);
//       return {
//         success: false,
//         error: 'মেসেজ পাঠাতে সমস্যা হয়েছে',
//       };
//     }
//   }

//   // টাইপিং ইন্ডিকেটর
//   @SubscribeMessage('typing')
//   handleTyping(
//     @ConnectedSocket() client: Socket,
//     @MessageBody()
//     payload: { chatId: string; isTyping: boolean; userId: string },
//   ) {
//     // টাইপিং স্ট্যাটাস শুধুমাত্র ওই চ্যাট রুমে পাঠানো
//     client.to(`chat:${payload.chatId}`).emit('userTyping', {
//       userId: payload.userId,
//       isTyping: payload.isTyping,
//     });
//   }

//   // চ্যাট হিস্ট্রি লোড করা
//   @SubscribeMessage('loadChatHistory')
//   async handleLoadChatHistory(
//     @ConnectedSocket() client: Socket,
//     @MessageBody() payload: { chatId: string },
//   ) {
//     try {
//       const messages = await this.messageService.getMessages(payload.chatId);

//       client.emit('chatHistory', {
//         chatId: payload.chatId,
//         messages: messages,
//       });

//       return {
//         success: true,
//         messages: messages,
//       };
//     } catch (error) {
//       console.error('Error loading chat history:', error);
//       return {
//         success: false,
//         error: 'চ্যাট হিস্ট্রি লোড করতে সমস্যা হয়েছে',
//       };
//     }
//   }
// }

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

  // অ্যাডমিন সকেট ম্যাপিং
  private adminSockets: Map<string, string[]> = new Map();
  // ইউজার সকেট ম্যাপিং
  private userSockets: Map<string, string[]> = new Map();

  constructor(
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
  ) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    const userId = client.handshake.query.userId as string;
    const role = client.handshake.query.role as string;
    const adminId = client.handshake.query.adminId as string;

    console.log({ userId, role, adminId });

    // ইউজার সকেট ট্র্যাকিং
    if (userId) {
      client.join(`user:${userId}`);

      // ইউজার সকেট স্টোর করা
      if (!this.userSockets.has(userId)) {
        this.userSockets.set(userId, []);
      }
      this.userSockets.get(userId)?.push(client.id);

      console.log(`User ${userId} joined room user:${userId}`);
    }

    // অ্যাডমিন সকেট ট্র্যাকিং
    if (role === 'admin' || role === 'office_admin') {
      client.join('admins');

      if (adminId) {
        // অ্যাডমিন স্পেসিফিক রুমে জয়েন
        client.join(`admin:${adminId}`);

        if (!this.adminSockets.has(adminId)) {
          this.adminSockets.set(adminId, []);
        }
        this.adminSockets.get(adminId)?.push(client.id);
      }

      console.log(`Admin ${client.id} joined the admin room.`);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId as string;
    const adminId = client.handshake.query.adminId as string;
    const role = client.handshake.query.role as string;

    console.log(`Client disconnected: ${client.id}`);

    // ইউজার সকেট রিমুভ
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

    // অ্যাডমিন সকেট রিমুভ
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

  // চেক ইফ ইউজার হ্যাজ এক্সিস্টিং চ্যাট
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
        // ইউজারকে চ্যাট রুমে জয়েন করানো
        client.join(`chat:${existingChat._id}`);

        client.emit('existingChat', {
          chatId: existingChat._id,
          status: existingChat.status,
        });

        // ইফ চ্যাট ইজ অ্যাক্টিভ, অ্যাডমিনকে নোটিফাই করা
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

  // গেট অ্যাক্টিভ চ্যাটস ফর অ্যাডমিন
  @SubscribeMessage('getActiveChats')
  async handleGetActiveChats(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { adminId: string },
  ) {
    try {
      const activeChats = await this.chatModel
        .find({
          acceptedBy: payload.adminId,
          status: 'accepted',
        })
        .select('userId status lastMessage lastMessageAt updatedAt')
        .sort({ updatedAt: -1 })
        .limit(20);

      client.emit('activeChats', activeChats);
    } catch (error) {
      console.error('Error getting active chats:', error);
    }
  }

  // ইউজার নক করা
  @SubscribeMessage('userKnock')
  async handleUserKnock(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { userId: string },
  ) {
    try {
      // চেক ইফ অলরেডি হ্যাজ পেন্ডিং বা অ্যাক্টিভ চ্যাট
      const existingChat = await this.chatModel.findOne({
        userId: payload.userId,
        status: { $in: ['pending', 'accepted'] },
      });

      if (existingChat) {
        // অলরেডি হ্যাজ চ্যাট
        client.join(`chat:${existingChat._id}`);
        client.emit('existingChat', {
          chatId: existingChat._id,
          status: existingChat.status,
        });
        return;
      }

      // নতুন চ্যাট তৈরি
      const chat:any = await this.chatService.createChat(payload.userId);
      client.join(`chat:${chat._id}`);

      // সব অ্যাডমিনকে নোটিফাই করা
      this.server.to('admins').emit('newChatRequest', {
        chatId: chat._id,
        userId: payload.userId,
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

  // অ্যাডমিন চ্যাট একসেপ্ট করা
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

      // অ্যাডমিনকে চ্যাট রুমে জয়েন করানো
      client.join(`chat:${payload.chatId}`);

      // ইউজারকে নোটিফাই করা
      this.server.to(`user:${chat.userId}`).emit('chatAccepted', {
        chatId: chat._id,
        adminId: payload.adminId,
        message: 'আপনার চ্যাট রিকোয়েস্ট একসেপ্ট হয়েছে',
      });

      // ইউজারকে চ্যাট রুমে জয়েন করানো (ইফ কানেক্টেড)
      const userSockets = this.userSockets.get(chat.userId.toString());
      if (userSockets) {
        userSockets.forEach((socketId) => {
          const socket = this.server.sockets.sockets.get(socketId);
          if (socket) {
            socket.join(`chat:${payload.chatId}`);
          }
        });
      }

      // অন্য অ্যাডমিনদের নোটিফাই করা
      client.to('admins').emit('chatTaken', {
        chatId: payload.chatId,
        adminId: payload.adminId,
      });

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

  // মেসেজ সেন্ড করা
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
      const message:any = await this.messageService.saveMessage({
        chatId: payload.chatId,
        senderId: payload.senderId,
        senderRole: payload.senderRole,
        text: payload.text,
      });

      // চ্যাট রুমে মেসেজ সেন্ড করা
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

      // ইফ ইউজার সেন্ড করছে এবং অ্যাডমিন অফলাইন, নোটিফিকেশন সেন্ড করা
      if (payload.senderRole === 'user') {
        const chat = await this.chatModel.findById(payload.chatId);
        if (chat && chat.acceptedBy) {
          const adminOnline = this.adminSockets.has(chat.acceptedBy.toString());
          if (!adminOnline) {
            // অ্যাডমিন অফলাইন - ইমেইল বা পুশ নোটিফিকেশন সেন্ড করা যায়
            console.log(
              `Admin ${chat.acceptedBy} is offline. Send email notification.`,
            );

            // সব অ্যাডমিনকে নোটিফাই করা (ব্যাকআপ)
            this.server.to('admins').emit('adminNotification', {
              title: 'নতুন মেসেজ!',
              body: `User: ${payload.text}`,
              chatId: payload.chatId,
            });
          }
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

  // টাইপিং ইন্ডিকেটর
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
    // টাইপিং স্ট্যাটাস চ্যাট রুমে সেন্ড করা (sender বাদে)
    client.to(`chat:${payload.chatId}`).emit('userTyping', {
      userId: payload.userId,
      userName: payload.userName,
      isTyping: payload.isTyping,
    });
  }

  // চ্যাট হিস্ট্রি লোড করা
  @SubscribeMessage('loadChatHistory')
  async handleLoadChatHistory(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { chatId: string },
  ) {
    try {
      const messages = await this.messageService.getMessages(payload.chatId);

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