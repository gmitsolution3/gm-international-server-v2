import { Module } from '@nestjs/common';
import { ScholarshipPackageModule } from './scholarship-package/scholarship-package.module';
import { ScholarshipApplicationModule } from './scholarship-application/scholarship-application.module';

@Module({
  imports: [ScholarshipPackageModule, ScholarshipApplicationModule],
})
export class ScholarshipModule {}
