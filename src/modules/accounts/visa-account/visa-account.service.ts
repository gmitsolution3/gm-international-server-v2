import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateVisaAccountDto } from './dto/create-visa-account.dto'; // সঠিক পাথ দিও
import {
  VisaAccount,
  VisaAccountDocument,
} from './entities/visa-account.entity';
import { User, UserDocument } from '../../user/user/entities/user.entity';
// import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class VisaAccountService {
  constructor(
    @InjectModel(VisaAccount.name)
    private readonly visaAccountModel: Model<VisaAccountDocument>,

    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  // ---------------- Create Account (POST Method) ----------------
  async create(createVisaAccountDto: CreateVisaAccountDto) {
    try {
      const { submittedBy, ...restData } = createVisaAccountDto;

      // ১. submittedBy (email) দিয়ে ইউজার কালেকশন থেকে ডাটা খোঁজা (password বাদ দিয়ে)
      const authData = await this.userModel.findOne(
        { email: submittedBy },
        { password: 0 },
      );

      if (!authData) {
        throw new NotFoundException('User not found with the provided email');
      }

      const { phone, userRole, branchName } = authData;

      // ২. accountHolder অবজেক্ট তৈরি করা
      const accountHolder = { email: submittedBy, phone, userRole, branchName };

      // ৩. ফাইনাল পেলোড তৈরি করে ডাটাবেজে সেভ করা
      const finalPayload = {
        ...restData,
        submittedBy,
        accountHolder,
      };

      const newVisaAccount = new this.visaAccountModel(finalPayload);
      const result = await newVisaAccount.save();

      if (!result) {
        throw new InternalServerErrorException(
          'Data not inserted yet!! Try again later',
        );
      }

      return {
        success: true,
        message: 'Account created successfully',
        data: result,
      };
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException(
        err.message || 'Something went wrong',
      );
    }
  }

  // ---------------- Get Accounts (GET Method) ----------------
  async getAccounts(email: string) {
    if (!email) {
      throw new BadRequestException('Email query parameter is required');
    }

    try {
      // ১. ইউজার ইনফো বের করা (password ফিল্ড বাদ দিয়ে)
      const authData = await this.userModel.findOne({ email }, { password: 0 });

      if (!authData) {
        throw new NotFoundException('User not found with the provided email');
      }

      const { phone, userRole, branchName } = authData;

      // ২. রোল যদি admin হয়
      if (userRole === 'admin') {
        const result = await this.visaAccountModel
          .find()
          .sort({ createdAt: -1 })
          .exec();

        if (!result || result.length === 0) {
          throw new NotFoundException('No account found for this email');
        }

        return {
          success: true,
          message: 'Account fetched successfully',
          data: {
            result,
            adminAccount: { email, phone, userRole, branchName },
          },
        };
      }

      // ৩. রোল যদি সাধারণ ইউজার হয় (accountHolder ফিল্ড বাদ দিয়ে)
      else {
        const result = await this.visaAccountModel
          .find({ 'accountHolder.email': email }, { accountHolder: 0 })
          .sort({ createdAt: -1 })
          .exec();

        if (!result || result.length === 0) {
          throw new NotFoundException('No account found for this email');
        }

        return {
          success: true,
          message: 'Account fetched successfully',
          data: result,
        };
      }
    } catch (err) {
      if (
        err instanceof NotFoundException ||
        err instanceof BadRequestException
      ) {
        throw err;
      }
      throw new InternalServerErrorException(
        err.message || 'Something went wrong',
      );
    }
  }

  // ---------------- Update Account (PUT Method) ----------------
  async update(id: string, updateData: Partial<CreateVisaAccountDto>) {
    // এক্সপ্রেস কোডের মত ObjectId ভ্যালিডেশন চেক
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    try {
      const result = await this.visaAccountModel
        .findByIdAndUpdate(
          id,
          {
            $set: {
              ...updateData,
              updatedAt: new Date(), // এক্সপ্রেসের লজিক অনুযায়ী ম্যানুয়াল updatedAt সেট
            },
          },
          { new: true, runValidators: true },
        )
        .exec();

      if (!result) {
        throw new NotFoundException('Account not found');
      }

      return {
        success: true,
        message: 'Account updated successfully',
      };
    } catch (err) {
      if (
        err instanceof NotFoundException ||
        err instanceof BadRequestException
      ) {
        throw err;
      }
      throw new InternalServerErrorException(
        err.message || 'Failed to update account',
      );
    }
  }
}
