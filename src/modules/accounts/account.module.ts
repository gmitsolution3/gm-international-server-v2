import { Module } from '@nestjs/common';
import { StdAccountModule } from './std-account/std-account.module';
import { MedAccountModule } from './med-account/med-account.module';
import { BusinessAccountModule } from './business-account/business-account.module';
import { TouristAccountModule } from './tourist-account/tourist-account.module';
import { VisaAccountModule } from './visa-account/visa-account.module';

@Module({
  imports: [
    StdAccountModule,
    MedAccountModule,
    BusinessAccountModule,
    TouristAccountModule,
    VisaAccountModule,
  ],
})
export class AccountModules {}
