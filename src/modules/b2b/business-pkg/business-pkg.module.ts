import { Module } from '@nestjs/common';
import { BusinessPkgService } from './business-pkg.service';
import { BusinessPkgController } from './business-pkg.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  B2BBusinessPkg,
  B2BBusinessPkgSchema,
} from './entities/business-pkg.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: B2BBusinessPkg.name, schema: B2BBusinessPkgSchema },
    ]),
  ],
  controllers: [BusinessPkgController],
  providers: [BusinessPkgService],
})
export class BusinessPkgModule {}
