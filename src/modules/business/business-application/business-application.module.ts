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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BusinessApplication.name, schema: BusinessApplicationSchema },
      { name: BusinessPackage.name, schema: BusinessPackageSchema },
    ]),
    FacebookCapiModule,
  ],
  controllers: [BusinessApplicationController],
  providers: [BusinessApplicationService],
})
export class BusinessApplicationModule {}
