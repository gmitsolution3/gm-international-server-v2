import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMedAccountDto } from './dto/create-med-account.dto';
import { UpdateMedAccountDto } from './dto/update-med-account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MedAccount, MedAccountDocument } from './entities/med-account.entity';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../../user/user/entities/user.entity';

@Injectable()
export class MedAccountService {
  constructor(
    @InjectModel(MedAccount.name)
    private readonly medAccountModel: Model<MedAccountDocument>,

    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createMedAccountDto: CreateMedAccountDto) {
    try {
      const { submittedBy, ...restData } = createMedAccountDto;

      const authData = await this.userModel.findOne(
        { email: submittedBy },
        { password: 0 },
      );

      if (!authData) {
        throw new NotFoundException('User not found with the provided email');
      }

      const { phone, userRole, branchName } = authData;

      const accountHolder = {
        email: submittedBy,
        phone,
        userRole,
        branchName: branchName ? branchName : 'main',
      };

      const finalPayload = {
        ...restData,
        submittedBy,
        accountHolder,
      };

      const newMedAccount = new this.medAccountModel(finalPayload);
      const result = await newMedAccount.save();

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

  async getAccounts(email: string) {
    if (!email) {
      throw new BadRequestException('Email query parameter is required');
    }

    try {
      // ১. ইউজার ইনফো বের করা (password বাদ দিয়ে)
      const authData = await this.userModel.findOne({ email }, { password: 0 });

      if (!authData) {
        throw new NotFoundException('User not found with the provided email');
      }

      const { phone, userRole, branchName } = authData;

      // ২. রোল যদি admin হয়
      if (userRole === 'admin') {
        const result = await this.medAccountModel
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

      // ৩. রোল যদি সাধারণ ইউজার বা অন্য কিছু হয় (accountHolder ফিল্ড বাদ দিয়ে)
      else {
        const result = await this.medAccountModel
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
  async update(id: string, updateData: Partial<CreateMedAccountDto>) {
   
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    try {
     
      const { ...pureUpdateData } = updateData;

      const result = await this.medAccountModel
        .findByIdAndUpdate(
          id,
          {
            $set: {
              ...pureUpdateData, 
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
