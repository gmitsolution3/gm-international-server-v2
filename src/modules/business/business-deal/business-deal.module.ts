import { Module } from '@nestjs/common';
import { BusinessDealService } from './business-deal.service';
import { BusinessDealController } from './business-deal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BusinessDeal, BusinessDealSchema } from './entities/business-deal.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BusinessDeal.name, schema: BusinessDealSchema },
    ]),
  ],
  controllers: [BusinessDealController],
  providers: [BusinessDealService],
})
export class BusinessDealModule {}
