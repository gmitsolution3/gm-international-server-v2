import { Module } from '@nestjs/common';
import { BusinessApplicationService } from './business-application.service';
import { BusinessApplicationController } from './business-application.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BusinessApplication,
  BusinessApplicationSchema,
} from './entities/business-application.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BusinessApplication.name, schema: BusinessApplicationSchema },
    ]),
  ],
  controllers: [BusinessApplicationController],
  providers: [BusinessApplicationService],
})
export class BusinessApplicationModule {}
