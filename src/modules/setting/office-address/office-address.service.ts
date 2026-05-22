import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OfficeAddress } from './entities/office-address.entity';
import { CreateOfficeAddressDto } from './dto/create-office-address.dto';
import { UpdateOfficeAddressDto } from './dto/update-office-address.dto';

@Injectable()
export class OfficeAddressService {
  constructor(
    @InjectModel(OfficeAddress.name)
    private readonly officeAddressModel: Model<OfficeAddress>,
  ) {}
  async createOfficeAddress(createOfficeAddressDto: CreateOfficeAddressDto) {
    try {
      const data = await this.officeAddressModel.create(createOfficeAddressDto);
      return {
        success: true,
        message: 'Office address created successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create office address');
    }
  }

  async findAll() {
    try {
      const data = await this.officeAddressModel.find().exec();

      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch office addresses',
      );
    }
  }


  async findOne(id: string) {
    try {
      const data = await this.officeAddressModel.findById(id).exec();

      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch office address');
    }
  }

  async update(id: string, updateOfficeAddressDto: UpdateOfficeAddressDto) {
    try {
      const data = await this.officeAddressModel
        .findByIdAndUpdate(id, updateOfficeAddressDto, {
          new: true,
        })
        .exec();

      return {
        success: true,
        message: 'Office address updated successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update office address');
    }
  }

  async remove(id: string) {
    try {
      await this.officeAddressModel.findByIdAndDelete(id).exec();

      return {
        success: true,
        message: 'Office address deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete office address');
    }
  }
}
