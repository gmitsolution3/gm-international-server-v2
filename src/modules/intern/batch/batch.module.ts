import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InternBatch, InternBatchSchema } from './entities/batch.entity';
import { InternBatchController } from './batch.controller';
import { InternBatchService } from './batch.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InternBatch.name, schema: InternBatchSchema },
    ]),
  ],
  controllers: [InternBatchController],
  providers: [InternBatchService],
  exports: [InternBatchService],
})
export class InternBatchModule {}
