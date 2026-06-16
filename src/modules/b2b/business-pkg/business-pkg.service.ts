import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBusinessPkgDto } from './dto/create-business-pkg.dto';
import { UpdateBusinessPkgDto } from './dto/update-business-pkg.dto';
import {
  B2BBusinessPkg,
  B2BBusinessPkgDocument,
} from './entities/business-pkg.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BusinessPkgService {
  constructor(
    @InjectModel(B2BBusinessPkg.name)
    private readonly businessDealModel: Model<B2BBusinessPkgDocument>,
  ) {}

  async create(createBusinessPkgDto: CreateBusinessPkgDto) {
    try {
      const { packageIds, action } = createBusinessPkgDto;

      const existingPkg = await this.businessDealModel.findOne({}).exec();

      if (!existingPkg) {
        const uniqueIds = [...new Set(packageIds)];

        const data = await this.businessDealModel.create({
          action,
          packageIds: uniqueIds,
        });
        return { success: true, message: 'Created successfully', data };
      }
      const existingIdsStrings = existingPkg.packageIds.map((id) =>
        id.toString(),
      );
      const newUniqueIds = packageIds.filter(
        (id) => !existingIdsStrings.includes(id),
      );
      if (newUniqueIds.length === 0) {
        return {
          success: true,
          message: 'Packages already exist, no new package added',
          data: existingPkg,
        };
      }
      const updatedData = await this.businessDealModel
        .findOneAndUpdate(
          { _id: existingPkg._id },
          {
            $addToSet: { packageIds: { $each: newUniqueIds } },
          },
          {
            returnDocument: 'after',
          },
        )
        .exec();
      return {
        success: true,
        message: 'New packages added successfully',
        data: updatedData,
      };
    } catch (error) {
      console.log({ error });
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to save standard package');
    }
  }

  async findAll() {
    try {
      const data = await this.businessDealModel
        .find()
        .populate('packageIds')
        .lean()
        .exec();

      return {
        success: true,
        message: 'find student b2b packages',
        data: data[0],
      };
    } catch (error) {
      console.log({ error });
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException("Could't find any pkg");
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} businessPkg`;
  }

  update(id: number, updateBusinessPkgDto: UpdateBusinessPkgDto) {
    return `This action updates a #${id} businessPkg`;
  }

  remove(id: number) {
    return `This action removes a #${id} businessPkg`;
  }
}
