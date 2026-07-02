import { Module } from '@nestjs/common';
import { VisaFromService } from './visa-from.service';
import { VisaFromController } from './visa-from.controller';
import { VisaFile, VisaFileSchema, VisaFrom, VisaFromSchema } from './entities/visa-from.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VisaFrom.name, schema: VisaFromSchema },
      { name: VisaFile.name, schema: VisaFileSchema },
    ]),
  ],
  controllers: [VisaFromController],
  providers: [VisaFromService],
})
export class VisaFromModule {}
