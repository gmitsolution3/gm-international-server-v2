import { Module } from '@nestjs/common';
import { NoticeManagementService } from './notice-management.service';
import { NoticeManagementController } from './notice-management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NoticeManagement, NoticeManagementSchema } from './entities/notice-management.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NoticeManagement.name, schema: NoticeManagementSchema },
    ]),
  ],
  controllers: [NoticeManagementController],
  providers: [NoticeManagementService],
})
export class NoticeManagementModule {}
