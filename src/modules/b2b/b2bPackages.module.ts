import { Module } from '@nestjs/common';
import { StdPkgModule } from './std-pkg/std-pkg.module';
import { TouristPkgModule } from './tourist-pkg/tourist-pkg.module';
import { MedicalPkgModule } from './medical-pkg/medical-pkg.module';
import { BusinessPkgModule } from './business-pkg/business-pkg.module';
import { VisaRateModule } from './visa-rate/visa-rate.module';

@Module({
  imports: [
    StdPkgModule,
    TouristPkgModule,
    MedicalPkgModule,
    BusinessPkgModule,
    VisaRateModule,
  ],
})
export class B2BPackagesModule {}
