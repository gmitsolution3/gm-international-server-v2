
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateBusinessAccountDto } from './dto/create-business-account.dto'; // সঠিক পাথ দিও
import {
  BusinessAccount,
  BusinessAccountDocument,
} from './entities/business-account.entity';
import { User, UserDocument } from '../../user/user/entities/user.entity';
// import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class BusinessAccountService {
  constructor(
    @InjectModel(BusinessAccount.name)
    private readonly businessAccountModel: Model<BusinessAccountDocument>,

    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  // ---------------- Create Account (POST Method) ----------------
  async create(createBusinessAccountDto: CreateBusinessAccountDto) {
    try {
      const { submittedBy, ...restData } = createBusinessAccountDto;

      const authData = await this.userModel.findOne(
        { email: submittedBy },
        { password: 0 },
      );

      if (!authData) {
        throw new NotFoundException('User not found with the provided email');
      }

      const { phone, userRole, branchName } = authData;

      const accountHolder = { email: submittedBy, phone, userRole, branchName };

      const finalPayload = {
        ...restData,
        submittedBy,
        accountHolder,
      };


      const newBusinessAccount = new this.businessAccountModel(finalPayload);
      const result = await newBusinessAccount.save();

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
      const authData = await this.userModel.findOne({ email }, { password: 0 });

      if (!authData) {
        throw new NotFoundException('User not found with the provided email');
      }

      const { phone, userRole, branchName } = authData;

      if (userRole === 'admin') {
        const result = await this.businessAccountModel
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
      } else {
        const result = await this.businessAccountModel
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
  async update(id: string, updateData: Partial<CreateBusinessAccountDto>) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    try {
      const result = await this.businessAccountModel
        .findByIdAndUpdate(
          id,
          {
            $set: {
              ...updateData,
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
