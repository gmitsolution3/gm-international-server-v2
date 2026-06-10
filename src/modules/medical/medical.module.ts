import { Module } from '@nestjs/common';
import { MedicalPackageModule } from './medical-package/medical-package.module';
import { MedicalApplicationModule } from './medical-application/medical-application.module';
import { MedicalReviewModule } from './medical-review/medical-review.module';

@Module({
  imports: [MedicalPackageModule, MedicalApplicationModule, MedicalReviewModule],
})
export class MedicalModule {}
