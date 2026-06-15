import { Module } from '@nestjs/common';
import { B2bUserService } from './b2b_user.service';
import { B2bUserController } from './b2b_user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { B2bUser, B2bUserSchema } from './entities/b2b_user.entity';
import {
  ScholarshipPackage,
  ScholarshipPkgSchema,
} from '../../scholarship/scholarship.schema';
import {
  TouristPackage,
  TouristPackageSchema,
} from '../../tourist/tourist-package/entities/tourist-package.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: B2bUser.name, schema: B2bUserSchema },
      { name: ScholarshipPackage.name, schema: ScholarshipPkgSchema },
      { name: TouristPackage.name, schema: TouristPackageSchema },
    ]),
  ],
  controllers: [B2bUserController],
  providers: [B2bUserService],
})
export class B2bUserModule {}
