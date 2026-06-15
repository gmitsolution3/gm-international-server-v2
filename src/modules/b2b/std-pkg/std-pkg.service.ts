import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStdPkgDto } from './dto/create-std-pkg.dto';
import { UpdateStdPkgDto } from './dto/update-std-pkg.dto';
import { InjectModel } from '@nestjs/mongoose';
import { B2BStdPkg, StdPkgDocument } from './entities/std-pkg.entity';
import { Model } from 'mongoose';

@Injectable()
export class StdPkgService {
  constructor(
    @InjectModel(B2BStdPkg.name)
    private readonly B2BStdPkgModel: Model<StdPkgDocument>,
  ) {}

  async create(createStdPkgDto: CreateStdPkgDto) {
    try {
      const { packageId } = createStdPkgDto;

      const existingPkg = await this.B2BStdPkgModel.findOne({}).exec();

      if (!existingPkg) {
        const uniqueIds = [...new Set(packageId)];

        const data = await this.B2BStdPkgModel.create({
          packageId: uniqueIds,
          packageCount: uniqueIds.length,
        });
        return { success: true, message: 'Created successfully', data };
      }
      const existingIdsStrings = existingPkg.packageId.map((id) =>
        id.toString(),
      );
      const newUniqueIds = packageId.filter(
        (id) => !existingIdsStrings.includes(id),
      );
      if (newUniqueIds.length === 0) {
        return {
          success: true,
          message: 'Packages already exist, no new package added',
          data: existingPkg,
        };
      }
      const updatedData = await this.B2BStdPkgModel.findOneAndUpdate(
        { _id: existingPkg._id },
        {
          $addToSet: { packageId: { $each: newUniqueIds } },
          $inc: { packageCount: newUniqueIds.length },
        },
        { new: true },
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
  findAll() {
    return `This action returns all stdPkg`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stdPkg`;
  }

  update(id: number, updateStdPkgDto: UpdateStdPkgDto) {
    return `This action updates a #${id} stdPkg`;
  }

  remove(id: number) {
    return `This action removes a #${id} stdPkg`;
  }
}
