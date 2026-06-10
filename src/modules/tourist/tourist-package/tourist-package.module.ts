import { Module } from '@nestjs/common';
import { TouristPackageService } from './tourist-package.service';
import { TouristPackageController } from './tourist-package.controller';
import {
  TouristPackage,
  TouristPackageSchema,
} from './entities/tourist-package.entity';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TouristApplication,
  TouristApplicationSchema,
} from '../tourist-application/entities/tourist-application.entity';
import {
  TouristQuery,
  TouristQuerySchema,
} from '../custom-application/entities/custom-application.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TouristPackage.name, schema: TouristPackageSchema },
      { name: TouristApplication.name, schema: TouristApplicationSchema },
      { name: TouristQuery.name, schema: TouristQuerySchema },
    ]),
  ],
  controllers: [TouristPackageController],
  providers: [TouristPackageService],
})
export class TouristPackageModule {}
