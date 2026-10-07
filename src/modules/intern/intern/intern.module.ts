import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InternProfile, InternProfileSchema } from './entities/intern.entity';
import { InternProfileController } from './intern.controller';
import { InternProfileService } from './intern.service';
import { InternBatch, InternBatchSchema } from '../batch/entities/batch.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InternProfile.name, schema: InternProfileSchema },
      { name: InternBatch.name, schema: InternBatchSchema },
    ]),
  ],
  controllers: [InternProfileController],
  providers: [InternProfileService],
  exports: [InternProfileService],
})
export class InternProfileModule {}
