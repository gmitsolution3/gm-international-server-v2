import { Module } from '@nestjs/common';
import { BusinessPackageModule } from './business-package/business-package.module';
import { BusinessApplicationModule } from './business-application/business-application.module';
import { BusinessDealModule } from './business-deal/business-deal.module';

@Module({
  imports: [
    BusinessApplicationModule,
    BusinessDealModule,
    BusinessPackageModule,
  ],
})
export class BusinessModule {}
