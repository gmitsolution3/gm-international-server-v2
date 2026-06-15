import { Module } from '@nestjs/common';
import { B2bApplicationsService } from './b2b_applications.service';
import { B2bApplicationsController } from './b2b_applications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  B2BApplication,
  B2BApplicationSchema,
} from './entities/b2b_application.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: B2BApplication.name, schema: B2BApplicationSchema },
    ]),
  ],
  controllers: [B2bApplicationsController],
  providers: [B2bApplicationsService],
})
export class B2bApplicationsModule {}
