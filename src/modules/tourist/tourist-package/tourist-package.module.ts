import { Module } from '@nestjs/common';
import { TouristPackageService } from './tourist-package.service';
import { TouristPackageController } from './tourist-package.controller';
import {
  TouristPackage,
  TouristPackageSchema,
} from './entities/tourist-package.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TouristPackage.name, schema: TouristPackageSchema },
    ]),
  ],
  controllers: [TouristPackageController],
  providers: [TouristPackageService],
})
export class TouristPackageModule {}
