import { Module } from '@nestjs/common';
import { ScholarshipApplicationService } from './scholarship-application.service';
import { ScholarshipApplicationController } from './scholarship-application.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ScholarshipApplication,
  ScholarshipApplicationSchema,
} from '../application.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ScholarshipApplication.name,
        schema: ScholarshipApplicationSchema,
      },
    ]),
  ],
  controllers: [ScholarshipApplicationController],
  providers: [ScholarshipApplicationService],
})
export class ScholarshipApplicationModule {}
