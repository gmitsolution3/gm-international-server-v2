import { Module } from '@nestjs/common';
import { InternBatchModule } from './batch/batch.module';
import { InternProfileModule } from './intern/intern.module';

@Module({
  imports: [InternBatchModule, InternProfileModule],
})
export class ManageInternModule {}
