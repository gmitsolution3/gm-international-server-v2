import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMedicalPkgDto } from './dto/create-medical-pkg.dto';
import { UpdateMedicalPkgDto } from './dto/update-medical-pkg.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  B2BMedicalPkg,
  B2BMedicalPkgDocument,
} from './entities/medical-pkg.entity';
import { Model } from 'mongoose';

@Injectable()
export class MedicalPkgService {
  constructor(
    @InjectModel(B2BMedicalPkg.name)
    private readonly B2BMedicalPkgModel: Model<B2BMedicalPkgDocument>,
  ) {}

  async create(createMedPkgDto: CreateMedicalPkgDto) {
    try {
      const { packageIds, action } = createMedPkgDto;

      const existingPkg = await this.B2BMedicalPkgModel.findOne({}).exec();

      if (!existingPkg) {
        const uniqueIds = [...new Set(packageIds)];

        const data = await this.B2BMedicalPkgModel.create({
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
      const updatedData = await this.B2BMedicalPkgModel.findOneAndUpdate(
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
  findAll() {
    return `This action returns all medicalPkg`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicalPkg`;
  }

  update(id: number, updateMedicalPkgDto: UpdateMedicalPkgDto) {
    return `This action updates a #${id} medicalPkg`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicalPkg`;
  }
}
