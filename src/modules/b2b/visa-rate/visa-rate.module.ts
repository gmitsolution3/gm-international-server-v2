import { Module } from '@nestjs/common';
import { VisaRateService } from './visa-rate.service';
import { VisaRateController } from './visa-rate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VisaRate, VisaRateSchema } from './entities/visa-rate.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VisaRate.name, schema: VisaRateSchema },
    ]),
  ],
  controllers: [VisaRateController],
  providers: [VisaRateService],
})
export class VisaRateModule {}
