import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { NoticeManagement } from './entities/notice-management.entity';

import { CreateNoticeManagementDto } from './dto/create-notice-management.dto';
import { UpdateNoticeManagementDto } from './dto/update-notice-management.dto';

@Injectable()
export class NoticeManagementService {
  constructor(
    @InjectModel(NoticeManagement.name)
    private readonly noticeManagementModel: Model<NoticeManagement>,
  ) {}

  async createNotice(createNoticeManagementDto: CreateNoticeManagementDto) {
    try {
      const data = await this.noticeManagementModel.create(
        createNoticeManagementDto,
      );

      return {
        success: true,
        message: 'Notice created successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create notice');
    }
  }

  // সব নোটিশ খোঁজার জন্য
  async findAll() {
    try {
      const data = await this.noticeManagementModel.find().exec();

      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch notices');
    }
  }

  // আইডি দিয়ে নির্দিষ্ট নোটিশ খোঁজার জন্য
  async findOne(id: string) {
    try {
      const data = await this.noticeManagementModel.findById(id).exec();

      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch notice');
    }
  }

  async getNotice(query: string) {
    const queryFor = { noticeFor: query };
    try {
      const data = await this.noticeManagementModel.find(queryFor).exec();
      return { success: true, message: 'Get notice', data };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch notice');
    }
  }

  // আইডি দিয়ে নোটিশ আপডেট করার জন্য
  async update(
    id: string,
    updateNoticeManagementDto: UpdateNoticeManagementDto,
  ) {
    try {
      const data = await this.noticeManagementModel
        .findByIdAndUpdate(id, updateNoticeManagementDto, {
          new: true,
        })
        .exec();

      return {
        success: true,
        message: 'Notice updated successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update notice');
    }
  }

  // আইডি দিয়ে নোটিশ ডিলিট করার জন্য
  async remove(id: string) {
    try {
      await this.noticeManagementModel.findByIdAndDelete(id).exec();

      return {
        success: true,
        message: 'Notice deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete notice');
    }
  }
}
