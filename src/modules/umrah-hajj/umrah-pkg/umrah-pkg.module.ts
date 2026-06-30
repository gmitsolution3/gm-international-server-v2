import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UmrahHajjPackage,
  UmrahHajjPackageSchema,
} from './entities/umrah-pkg.entity';
import { UmrahController } from './umrah-pkg.controller';
import { UmrahService } from './umrah-pkg.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UmrahHajjPackage.name, schema: UmrahHajjPackageSchema },
    ]),
  ],
  controllers: [UmrahController],
  providers: [UmrahService],
  exports:[UmrahService]
})
export class UmrahModule {}
