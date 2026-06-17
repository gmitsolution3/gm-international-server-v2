import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStdAccountDto } from './dto/create-std-account.dto';
import { UpdateStdAccountDto } from './dto/update-std-account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { StdAccount, StdAccountDocument } from './entities/std-account.entity';
import { User, UserDocument } from '../../user/user/entities/user.entity';
import { Model } from 'mongoose';
import {
  MedAccount,
  MedAccountDocument,
} from '../med-account/entities/med-account.entity';
import {
  BusinessAccount,
  BusinessAccountDocument,
} from '../business-account/entities/business-account.entity';
import {
  TouristAccount,
  TouristAccountDocument,
} from '../tourist-account/entities/tourist-account.entity';
import {
  VisaAccount,
  VisaAccountDocument,
} from '../visa-account/entities/visa-account.entity';

@Injectable()
export class StdAccountService {
  constructor(
    @InjectModel(StdAccount.name)
    private readonly StdAccountModal: Model<StdAccountDocument>,

    @InjectModel(MedAccount.name)
    private readonly medAccountModel: Model<MedAccountDocument>,

    @InjectModel(BusinessAccount.name)
    private readonly businessAccountModel: Model<BusinessAccountDocument>,

    @InjectModel(TouristAccount.name)
    private readonly touristAccountModel: Model<TouristAccountDocument>,

    @InjectModel(VisaAccount.name)
    private readonly visaAccountModel: Model<VisaAccountDocument>,

    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createStdAccountDto: CreateStdAccountDto) {
    try {
      const { email, ...restData } = createStdAccountDto;

      const authData = await this.userModel.findOne(
        { email: email },
        { password: 0 },
      );

      if (!authData) {
        throw new InternalServerErrorException(
          'User not found with the provided email',
        );
      }

      const { phone, userRole, branchName } = authData;

      const accountHolder = {
        email,
        phone,
        userRole,
        branchName: branchName ? branchName : 'Main',
      };
      const finalPayload = {
        ...restData,
        email,
        accountHolder,
      };

      console.log({ finalPayload });

      const newAccount = new this.StdAccountModal(finalPayload);
      const result = await newAccount.save();

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
      const authData = await this.userModel.findOne(
        { email: email },
        { password: 0 },
      );

      if (!authData) {
        throw new NotFoundException('User not found with the provided email');
      }

      const { phone, userRole, branchName } = authData;

      if (userRole === 'admin') {
        const result = await this.StdAccountModal.find({}, { userRole: 0 })
          .sort({ createdAt: -1 })
          .exec();

        if (!result || result.length === 0) {
          throw new NotFoundException('No account found for this email');
        }
        console.log('include admin holder');
        return {
          success: true,
          message: 'Account fetched successfully',
          data: {
            result,
            adminHolder: { email, phone, userRole, branchName },
          },
        };
      } else {
        console.log('normal');
        const result = await this.StdAccountModal.find(
          { 'accountHolder.email': email },
          { userRole: 0 },
        )
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

  // ---------------- Update Service (PUT Method) ----------------
  async update(id: string, updateStdAccountDto: UpdateStdAccountDto) {
    try {
      const updatedAccount = await this.StdAccountModal.findByIdAndUpdate(
        id,
        updateStdAccountDto,
        { new: true, runValidators: true },
      ).exec();

      if (!updatedAccount) {
        throw new NotFoundException(`Account with ID ${id} not found`);
      }

      return {
        success: true,
        message: 'Account updated successfully',
        data: updatedAccount,
      };
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException(
        err.message || 'Failed to update account',
      );
    }
  }

  // ---------------- Delete Service (DELETE Method) ----------------
  async remove(id: string) {
    try {
      const deletedAccount =
        await this.StdAccountModal.findByIdAndDelete(id).exec();

      if (!deletedAccount) {
        throw new NotFoundException(`Account with ID ${id} not found`);
      }

      return {
        success: true,
        message: 'Account deleted successfully',
        data: deletedAccount,
      };
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException(
        err.message || 'Failed to delete account',
      );
    }
  }

  async getAccountAnalysis(email: string) {
    if (!email) {
      throw new BadRequestException('Email query parameter is required');
    }

    try {
      // ✅ ১. Get user
      const authData = await this.userModel.findOne({ email }, { password: 0 });

      if (!authData) {
        throw new NotFoundException('User not found');
      }

      const { userRole, branchName } = authData;

      // ✅ ২. Role based filter
      let matchStage = {};
      if (userRole !== 'admin') {
        matchStage = {
          'accountHolder.branchName': branchName,
        };
      }

      // ✅ ৩. Fetch all data from 5 collections (with filter)
      const [studentDocument, medical, tourist, business, visa] =
        await Promise.all([
          this.StdAccountModal.find(matchStage).exec(),
          this.medAccountModel.find(matchStage).exec(),
          this.touristAccountModel.find(matchStage).exec(),
          this.businessAccountModel.find(matchStage).exec(),
          this.visaAccountModel.find(matchStage).exec(),
        ]);

      // ✅ ৪. Merge all data
      const allData = [
        ...studentDocument,
        ...medical,
        ...tourist,
        ...business,
        ...visa,
      ];

      // =====================================================
      // 🔥 OVERVIEW
      // =====================================================
      const overview = allData.reduce(
        (acc, item) => {
          acc.totalAmount += item.totalAmount || 0;
          acc.totalAdvance += item.advance || 0;
          acc.totalDue += item.due || 0;
          return acc;
        },
        { totalAmount: 0, totalAdvance: 0, totalDue: 0 },
      );

      // =====================================================
      // 🔥 SERVICE-WISE
      // =====================================================
      const calculateService = (arr: any[]) =>
        arr.reduce(
          (acc, item) => {
            acc.total += item.totalAmount || 0;
            acc.advance += item.advance || 0;
            acc.due += item.due || 0;
            return acc;
          },
          { total: 0, advance: 0, due: 0 },
        );

      const serviceWise = {
        student: calculateService(studentDocument),
        medical: calculateService(medical),
        tourist: calculateService(tourist),
        business: calculateService(business),
        visa: calculateService(visa),
      };

      // =====================================================
      // 🔥 MONTHLY TREND
      // =====================================================
      const monthlyMap: Record<string, any> = {};

      allData.forEach((item:any) => {
        // if (!item.createdAt) return;

        const date = new Date(item.createdAt);
        const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

        if (!monthlyMap[key]) {
          monthlyMap[key] = {
            month: key,
            total: 0,
            advance: 0,
            due: 0,
          };
        }

        monthlyMap[key].total += item.totalAmount || 0;
        monthlyMap[key].advance += item.advance || 0;
        monthlyMap[key].due += item.due || 0;
      });

      const monthlyTrend = Object.values(monthlyMap).sort(
        (a: any, b: any) =>
          new Date(a.month).getTime() - new Date(b.month).getTime(),
      );

      // =====================================================
      // 🔥 ACCOUNT HOLDER PERFORMANCE
      // =====================================================
      const accountHolderMap: Record<string, any> = {};

      allData.forEach((item) => {
        const key = item.accountHolder?.email || 'unknown';

        if (!accountHolderMap[key]) {
          accountHolderMap[key] = {
            email: key,
            total: 0,
            advance: 0,
            due: 0,
          };
        }

        accountHolderMap[key].total += item.totalAmount || 0;
        accountHolderMap[key].advance += item.advance || 0;
        accountHolderMap[key].due += item.due || 0;
      });

      const accountHolderStats = Object.values(accountHolderMap);

      // =====================================================
      // 🔥 BRANCH ANALYSIS
      // =====================================================
      const branchMap: Record<string, any> = {};

      allData.forEach((item) => {
        const branch = item.accountHolder?.branchName || 'Main';
        if (!branchMap[branch]) {
          branchMap[branch] = {
            branch,
            total: 0,
            advance: 0,
            due: 0,
          };
        }

        branchMap[branch].total += item.totalAmount || 0;
        branchMap[branch].advance += item.advance || 0;
        branchMap[branch].due += item.due || 0;
      });

      const totalCounts = {
        totalRecords: allData.length,
        student: studentDocument.length,
        medical: medical.length,
        tourist: tourist.length,
        business: business.length,
        visa: visa.length,
      };

      const branchCountMap: Record<string, any> = {};

      allData.forEach((item) => {
        const branch = item.accountHolder?.branchName || 'Main';

        if (!branchCountMap[branch]) {
          branchCountMap[branch] = {
            branch,
            count: 0,
          };
        }

        branchCountMap[branch].count += 1;
      });

      const branchCounts = Object.values(branchCountMap);
      const accountHolderCountMap: Record<string, any> = {};
      allData.forEach((item) => {
        const key = item.accountHolder?.email || 'unknown';
        const branch = item.accountHolder?.branchName || 'Main branch';

        if (!accountHolderCountMap[key]) {
          accountHolderCountMap[key] = {
            email: key,
            branch: branch,
            count: 0,
          };
        }
        accountHolderCountMap[key].count += 1;
      });

      const accountHolderCounts = Object.values(accountHolderCountMap);
      const branchStats = Object.values(branchMap);

      // =====================================================
      // 🔥 DUE ANALYSIS
      // =====================================================
      const dueAnalysis = {
        totalDue: overview.totalDue,
        dueRatio:
          overview.totalAmount > 0
            ? (overview.totalDue / overview.totalAmount) * 100
            : 0,
      };

      // =====================================================
      // 🔥 MISSING DOCUMENT ANALYSIS
      // =====================================================
      const missingDocsMap: Record<string, number> = {};
      let totalMissingAccounts = 0;

      studentDocument.forEach((item: any) => {
        if (item.missingDocuments?.length) {
          totalMissingAccounts++;

          item.missingDocuments.forEach((doc: string) => {
            missingDocsMap[doc] = (missingDocsMap[doc] || 0) + 1;
          });
        }
      });

      const missingDocsAnalysis = {
        totalMissingAccounts,
        documents: Object.entries(missingDocsMap).map(([name, count]) => ({
          name,
          count,
        })),
      };

      // =====================================================
      // ✅ FINAL RESPONSE
      // =====================================================
      return {
        success: true,
        message: 'Analysis data receive',
        data: {
          overview,
          serviceWise,
          monthlyTrend,
          accountHolderStats,
          branchStats,
          dueAnalysis,
          missingDocsAnalysis,
          documentCount: { totalCounts, branchCounts, accountHolderCounts },
        },
      };
    } catch (err) {
      if (
        err instanceof NotFoundException ||
        err instanceof BadRequestException
      ) {
        throw err;
      }
      throw new InternalServerErrorException(
        err.message || 'Analysis processing failed',
      );
    }
  }
}
