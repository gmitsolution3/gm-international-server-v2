import { Module } from '@nestjs/common';
import { MedicalPackageService } from './medical-package.service';
import { MedicalPackageController } from './medical-package.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalPackage, MedicalPackageSchema } from './entities/medical-package.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MedicalPackage.name, schema: MedicalPackageSchema },
    ]),
  ],
  controllers: [MedicalPackageController],
  providers: [MedicalPackageService],
})
export class MedicalPackageModule {}
