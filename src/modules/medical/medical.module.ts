import { Module } from '@nestjs/common';
import { MedicalPackageModule } from './medical-package/medical-package.module';
import { MedicalApplicationModule } from './medical-application/medical-application.module';

@Module({
  imports: [MedicalPackageModule, MedicalApplicationModule],
})
export class MedicalModule {}
