import { Module } from '@nestjs/common';
import { TouristQueryController } from './custom-application.controller';
import { TouristQueryService } from './custom-application.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TouristQuery,
  TouristQuerySchema,
} from './entities/custom-application.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TouristQuery.name, schema: TouristQuerySchema },
    ]),
  ],
  controllers: [TouristQueryController],
  providers: [TouristQueryService],
})
export class CustomApplicationModule {}
