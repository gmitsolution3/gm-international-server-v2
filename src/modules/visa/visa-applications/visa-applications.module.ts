import { Module } from '@nestjs/common';
import { VisaApplicationsService } from './visa-applications.service';
import { VisaApplicationsController } from './visa-applications.controller';
import {
  VisaApplication,
  VisaApplicationSchema,
} from './entities/visa-application.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VisaApplication.name, schema: VisaApplicationSchema },
    ]),
  ],
  controllers: [VisaApplicationsController],
  providers: [VisaApplicationsService],
})
export class VisaApplicationsModule {}
