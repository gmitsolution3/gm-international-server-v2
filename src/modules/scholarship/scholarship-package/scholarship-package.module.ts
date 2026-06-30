import { Module } from '@nestjs/common';
import { ScholarshipPackageService } from './scholarship-package.service';
import { ScholarshipPackageController } from './scholarship-package.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ScholarshipPackage,
  ScholarshipPkgSchema,
} from '../scholarship.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ScholarshipPackage.name, schema: ScholarshipPkgSchema },
    ]),
  ],
  controllers: [ScholarshipPackageController],
  providers: [ScholarshipPackageService],
  exports: [ScholarshipPackageService],
})
export class ScholarshipPackageModule {}
