import { Module } from '@nestjs/common';
import { MedicalPackageService } from './medical-package.service';
import { MedicalPackageController } from './medical-package.controller';

@Module({
  controllers: [MedicalPackageController],
  providers: [MedicalPackageService],
})
export class MedicalPackageModule {}
