import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { UpdateUserDto, UpdateUserRoleDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { B2bUser, B2bUserDocument } from '../b2b_user/entities/b2b_user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(B2bUser.name)
    private readonly b2bUserModel: Model<B2bUserDocument>,
  ) {}

  async getAllUsers() {
    const users = await this.userModel
      .find()
      .select('-password')
      .sort({ createdAt: -1 });

    if (!users.length) {
      throw new NotFoundException('No user found');
    }

    return {
      success: true,
      message: 'User found',
      data: users,
    };
  }

  async getUserRole(email: string) {
    if (!email) {
      return { userRole: 'user' };
    }

    let user = await this.userModel.findOne({ email });

    if (!user) {
      user = await this.b2bUserModel.findOne({ email });
    }

    return {
      userRole: user?.userRole || 'user',
    };
  }

  async getProfileInfo(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    let user: any = await this.userModel.findOne({ email }).select('-password');

    if (!user) {
      user = await this.b2bUserModel.findOne({ email }).select('-password');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { success: true, message: 'get user data', data: user };
  }

  async getEmploy() {
    const employees = await this.userModel
      .find({
        userRole: {
          $ne: 'user',
        },
      })
      .select('-password');

    if (!employees.length) {
      throw new NotFoundException('No employ found');
    }

    return {
      success: true,
      message: 'Employ found',
      data: employees,
    };
  }

  async getAvatar(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    let user = await this.userModel.findOne({ email });

    if (!user) {
      user = await this.b2bUserModel.findOne({ email });
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      avatar: user.avatar,
    };
  }

  async updateProfile(id: string, updateUserDto: UpdateUserDto) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid user ID');
      }

      const updateData = {
        ...updateUserDto,
        updatedAt: new Date(),
      };

      let user = await this.userModel.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!user) {
        user = await this.b2bUserModel.findByIdAndUpdate(id, updateData, {
          new: true,
        });
      }

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return {
        success: true,
        message: 'Profile updated successfully',
        data: user,
      };
    } catch (err) {
      console.log({ err });
      throw new Error(err);
    }
  }

  async updateUserRole(id: string, updateUserRoleDto: UpdateUserRoleDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user id');
    }

    const user = await this.userModel.findByIdAndUpdate(
      id,
      {
        ...updateUserRoleDto,
        updatedAt: new Date(),
      },
      {
        new: true,
      },
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      success: true,
      message: 'Role updated successfully',
      data: user,
    };
  }

  async deleteUser(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user id');
    }

    const result = await this.userModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException('User not found');
    }

    return {
      success: true,
      message: 'User deleted successfully',
    };
  }
}
