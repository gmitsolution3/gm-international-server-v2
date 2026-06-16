import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CscaApplicationController } from './csca-applications.controller';
import { CscaApplicationService } from './csca-applications.service';
import { CscaApplication, CscaApplicationSchema } from './entities/csca-application.entity';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CscaApplication.name, schema: CscaApplicationSchema },
    ]),
  ],
  controllers: [CscaApplicationController],
  providers: [CscaApplicationService],
})
export class CscaApplicationsModule {}
