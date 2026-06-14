import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UmrahHajjPackage } from './entities/umrah-pkg.entity';
import { CreateUmrahHajjPackageDto } from './dto/create-umrah-pkg.dto';
import { UpdateUmrahPkgDto } from './dto/update-umrah-pkg.dto';

@Injectable()
export class UmrahService {
  constructor(
    @InjectModel(UmrahHajjPackage.name)
    private readonly umrahHajjPkgModel: Model<UmrahHajjPackage>,
  ) {}

  async create(createUmrahDto: CreateUmrahHajjPackageDto) {
    try {
      const data = await this.umrahHajjPkgModel.create(createUmrahDto);

      return { success: true, message: 'Package created successful', data };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create medical package',
        error,
      );
    }
  }

  async findAll() {
    try {
      const data = await this.umrahHajjPkgModel
        .find()
        .sort({ createdAt: -1 })
        .lean()
        .exec();

      return {
        success: true,
        message: 'Find the umrah hajj package',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create medical package',
      );
    }
  }
  async findHomePkg() {
    try {
      const data = await this.umrahHajjPkgModel
        .find()
        .sort({ createdAt: -1 })
        .limit(3)
        .lean()
        .exec();

      return {
        success: true,
        message: 'Find the umrah hajj package',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create medical package',
      );
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.umrahHajjPkgModel.findById(id).lean().exec();

      return {
        success: true,
        message: 'Find the umrah hajj package',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create medical package',
      );
    }
  }

  async update(id: number, updateUmrahDto: UpdateUmrahPkgDto) {
    return `This action updates a #${id} umrah`;
  }

  async remove(id: string) {
    try {
      const data = await this.umrahHajjPkgModel.findByIdAndDelete(id);
      return { success: true, data: data };
    } catch (error) {
      console.log({ error });
      throw new InternalServerErrorException(
        'Failed to create medical package',
      );
    }
  }
}
