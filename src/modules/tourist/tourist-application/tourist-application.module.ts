import { Module } from '@nestjs/common';
import { TouristApplicationService } from './tourist-application.service';
import { TouristApplicationController } from './tourist-application.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TouristApplication, TouristApplicationSchema } from './entities/tourist-application.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TouristApplication.name, schema: TouristApplicationSchema },
    ]),
  ],
  controllers: [TouristApplicationController],
  providers: [TouristApplicationService],
})
export class TouristApplicationModule {}
