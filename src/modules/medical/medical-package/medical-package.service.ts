import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMedicalPackageDto } from './dto/create-medical-package.dto';
import { UpdateMedicalPackageDto } from './dto/update-medical-package.dto';
import { MedicalPackage } from './entities/medical-package.entity';

@Injectable()
export class MedicalPackageService {
  constructor(
    @InjectModel(MedicalPackage.name)
    private readonly medicalPkgModel: Model<MedicalPackage>,
  ) {}

  // নতুন মেডিকেল প্যাকেজ তৈরি করার মেথড
  async createMedicalPkg(createMedicalPackageDto: CreateMedicalPackageDto) {
    try {
      const data = await this.medicalPkgModel.create(createMedicalPackageDto);
      return {
        success: true,
        message: 'Medical package created successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create medical package',
      );
    }
  }

  // সব প্যাকেজ একসাথে খোঁজার জন্য
  async findAll() {
    try {
      const data = await this.medicalPkgModel.find().exec();
      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch medical packages',
      );
    }
  }

  // আইডি দিয়ে নির্দিষ্ট একটি প্যাকেজ খোঁজার জন্য
  async findOne(id: string) {
    try {
      const data = await this.medicalPkgModel.findById(id).exec();
      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch the medical package',
      );
    }
  }

  // আইডি দিয়ে প্যাকেজ আপডেট করার জন্য
  async update(id: string, updateMedicalPackageDto: UpdateMedicalPackageDto) {
    try {
      const data = await this.medicalPkgModel
        .findByIdAndUpdate(id, updateMedicalPackageDto, { new: true })
        .exec();
      return {
        success: true,
        message: 'Medical package updated successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update medical package',
      );
    }
  }

  // আইডি দিয়ে প্যাকেজ ডিলিট করার জন্য
  async remove(id: string) {
    try {
      await this.medicalPkgModel.findByIdAndDelete(id).exec();
      return {
        success: true,
        message: 'Medical package deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to delete medical package',
      );
    }
  }
}
