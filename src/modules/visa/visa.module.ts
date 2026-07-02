import { Module } from '@nestjs/common';
import { VisaFromModule } from './visa-from/visa-from.module';
import { VisaApplicationsModule } from './visa-applications/visa-applications.module';

@Module({
  imports: [VisaFromModule, VisaApplicationsModule],
})
export class VisaModule {}
