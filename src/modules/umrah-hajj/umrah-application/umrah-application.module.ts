import { Module } from '@nestjs/common';
import { UmrahApplicationService } from './umrah-application.service';
import { UmrahApplicationController } from './umrah-application.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UmrahHajjBooking,
  UmrahHajjBookingSchema,
} from './entities/umrah-application.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UmrahHajjBooking.name, schema: UmrahHajjBookingSchema },
    ]),
  ],
  controllers: [UmrahApplicationController],
  providers: [UmrahApplicationService],
})
export class UmrahApplicationModule {}
