import { Module } from '@nestjs/common';
import { MedicalApplicationService } from './medical-application.service';
import { MedicalApplicationController } from './medical-application.controller';

@Module({
  controllers: [MedicalApplicationController],
  providers: [MedicalApplicationService],
})
export class MedicalApplicationModule {}
