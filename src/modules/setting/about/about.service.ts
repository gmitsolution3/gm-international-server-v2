import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { About } from './entities/about.entity';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';

@Injectable()
export class AboutService {
  constructor(
    @InjectModel(About.name)
    private readonly aboutModel: Model<About>,
  ) {}

  async createAbout(createAboutDto: CreateAboutDto) {
    try {
      let { order_index, ...rest } = createAboutDto;

      // order_index না পাঠালে last position এ add হবে
      if (order_index === undefined || order_index === null) {
        const lastItem = await this.aboutModel
          .findOne()
          .sort({ order_index: -1 });

        order_index = lastItem ? lastItem.order_index + 1 : 1;
      } else {
        order_index = Number(order_index);

        // existing items shift করবে
        await this.aboutModel.updateMany(
          {
            order_index: { $gte: order_index },
          },
          {
            $inc: { order_index: 1 },
          },
        );
      }

      const data = await this.aboutModel.create({
        ...rest,
        order_index,
      });

      return {
        success: true,
        message: 'About created successfully',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Failed to create about',
      );
    }
  }

  async findAll() {
    try {
      const data = await this.aboutModel
        .find({})
        .sort({ order_index: 1 })
        .exec();

      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch about data');
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.aboutModel.findById(id).exec();

      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch about data');
    }
  }

  async update(id: string, updateAboutDto: UpdateAboutDto) {
    try {
      const existing = await this.aboutModel.findById(id);

      if (!existing) {
        throw new NotFoundException('About not found');
      }

      const oldIndex = existing.order_index;
      const newIndex =
        updateAboutDto.order_index !== undefined
          ? Number(updateAboutDto.order_index)
          : oldIndex;

      if (newIndex !== oldIndex) {
        if (newIndex > oldIndex) {
          await this.aboutModel.updateMany(
            {
              order_index: {
                $gt: oldIndex,
                $lte: newIndex,
              },
            },
            {
              $inc: {
                order_index: -1,
              },
            },
          );
        } else {
          await this.aboutModel.updateMany(
            {
              order_index: {
                $gte: newIndex,
                $lt: oldIndex,
              },
            },
            {
              $inc: {
                order_index: 1,
              },
            },
          );
        }
      }

      const data = await this.aboutModel.findByIdAndUpdate(
        id,
        {
          $set: {
            ...updateAboutDto,
          },
        },
        {
          new: true,
        },
      );

      return {
        success: true,
        message: 'About updated successfully',
        data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        error.message || 'Failed to update about',
      );
    }
  }

  async remove(id: string) {
    try {
      await this.aboutModel.findByIdAndDelete(id).exec();
      return {
        success: true,
        message: 'About deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete about');
    }
  }
}
