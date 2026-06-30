import { Module } from '@nestjs/common';
import { BusinessPackageService } from './business-package.service';
import { BusinessPackageController } from './business-package.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BusinessPackage,
  BusinessPackageSchema,
} from './entities/business-package.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BusinessPackage.name, schema: BusinessPackageSchema },
    ]),
  ],
  controllers: [BusinessPackageController],
  providers: [BusinessPackageService],
  exports: [BusinessPackageService],
})
export class BusinessPackageModule {}
