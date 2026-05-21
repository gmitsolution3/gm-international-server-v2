import { Module } from '@nestjs/common';
import { MedicalApplicationService } from './medical-application.service';
import { MedicalApplicationController } from './medical-application.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalApplication, MedicalApplicationSchema } from './entities/medical-application.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MedicalApplication.name, schema: MedicalApplicationSchema },
    ]),
  ],
  controllers: [MedicalApplicationController],
  providers: [MedicalApplicationService],
})
export class MedicalApplicationModule {}
