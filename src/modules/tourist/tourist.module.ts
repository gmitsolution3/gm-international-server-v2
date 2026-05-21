import { Module } from '@nestjs/common';
import { TouristPackageModule } from './tourist-package/tourist-package.module';
import { TouristApplicationModule } from './tourist-application/tourist-application.module';
import { CustomApplicationModule } from './custom-application/custom-application.module';

@Module({
  imports: [
    TouristPackageModule,
    TouristApplicationModule,
    CustomApplicationModule,
  ],
})
export class TouristModule {}
