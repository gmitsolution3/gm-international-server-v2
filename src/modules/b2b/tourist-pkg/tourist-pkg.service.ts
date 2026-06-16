import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTouristPkgDto } from './dto/create-tourist-pkg.dto';
import { UpdateTouristPkgDto } from './dto/update-tourist-pkg.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  B2BTouristPkg,
  TouristPkgDocument,
} from './entities/tourist-pkg.entity';
import { Model } from 'mongoose';

@Injectable()
export class TouristPkgService {
  constructor(
    @InjectModel(B2BTouristPkg.name)
    private readonly TouristPkgModel: Model<TouristPkgDocument>,
  ) {}

  async create(createStdPkgDto: CreateTouristPkgDto) {
    try {
      const { packageIds } = createStdPkgDto;

      const existingPkg = await this.TouristPkgModel.findOne({}).exec();

      if (!existingPkg) {
        const uniqueIds = [...new Set(packageIds)];

        const data = await this.TouristPkgModel.create({
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
      const updatedData = await this.TouristPkgModel.findOneAndUpdate(
        { _id: existingPkg._id },
        {
          $addToSet: { packageIds: { $each: newUniqueIds } },
        },
        {
          returnDocument: 'after',
        },
      ).exec();
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
      const data = await this.TouristPkgModel.find()
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
    return `This action returns a #${id} touristPkg`;
  }

  update(id: number, updateTouristPkgDto: UpdateTouristPkgDto) {
    return `This action updates a #${id} touristPkg`;
  }

  remove(id: number) {
    return `This action removes a #${id} touristPkg`;
  }
}
