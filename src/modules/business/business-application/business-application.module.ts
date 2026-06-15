import { Module } from '@nestjs/common';
import { BusinessApplicationService } from './business-application.service';
import { BusinessApplicationController } from './business-application.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BusinessApplication,
  BusinessApplicationSchema,
} from './entities/business-application.entity';
import {
  BusinessPackage,
  BusinessPackageSchema,
} from '../business-package/entities/business-package.entity';
import { FacebookCapiModule } from '../../../common/facebook-capi/facebook-capi.module';
import {
  BusinessDeal,
  BusinessDealSchema,
} from '../business-deal/entities/business-deal.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BusinessApplication.name, schema: BusinessApplicationSchema },
      { name: BusinessPackage.name, schema: BusinessPackageSchema },
      { name: BusinessDeal.name, schema: BusinessDealSchema },
    ]),
    FacebookCapiModule,
  ],
  controllers: [BusinessApplicationController],
  providers: [BusinessApplicationService],
})
export class BusinessApplicationModule {}
