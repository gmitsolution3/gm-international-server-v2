import { Module } from '@nestjs/common';
import { TouristPkgService } from './tourist-pkg.service';
import { TouristPkgController } from './tourist-pkg.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  B2BTouristPkg,
  B2BTouristPkgSchema,
} from './entities/tourist-pkg.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: B2BTouristPkg.name, schema: B2BTouristPkgSchema },
    ]),
  ],
  controllers: [TouristPkgController],
  providers: [TouristPkgService],
})
export class TouristPkgModule {}
