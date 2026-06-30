import { Module } from '@nestjs/common';
import { SearchingController } from './searching.controller';
import { SearchService } from './searching.service';
import { ScholarshipPackageModule } from '../../scholarship/scholarship-package/scholarship-package.module';
import { MedicalPackageModule } from '../../medical/medical-package/medical-package.module';
import { TouristPackageModule } from '../../tourist/tourist-package/tourist-package.module';
import { BusinessPackageModule } from '../../business/business-package/business-package.module';
import { UmrahModule } from '../../umrah-hajj/umrah-pkg/umrah-pkg.module';

@Module({
  imports: [
    ScholarshipPackageModule,
    MedicalPackageModule,
    TouristPackageModule,
    BusinessPackageModule,
    UmrahModule,
  ],
  controllers: [SearchingController],
  providers: [SearchService],
})
export class SearchingModule {}
