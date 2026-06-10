import { Module } from '@nestjs/common';
import { MedicalReviewService } from './medical-review.service';
import { MedicalReviewController } from './medical-review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MedicalReview,
  MedicalReviewSchema,
} from './entities/medical-review.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MedicalReview.name, schema: MedicalReviewSchema },
    ]),
  ],
  controllers: [MedicalReviewController],
  providers: [MedicalReviewService],
})
export class MedicalReviewModule {}
