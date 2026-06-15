import { Module } from '@nestjs/common';
import { MedicalPkgService } from './medical-pkg.service';
import { MedicalPkgController } from './medical-pkg.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  B2BMedicalPkg,
  B2BMedicalPkgSchema,
} from './entities/medical-pkg.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: B2BMedicalPkg.name, schema: B2BMedicalPkgSchema },
    ]),
  ],
  controllers: [MedicalPkgController],
  providers: [MedicalPkgService],
})
export class MedicalPkgModule {}
