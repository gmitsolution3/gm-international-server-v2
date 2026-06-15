import { Module } from '@nestjs/common';
import { StdPkgService } from './std-pkg.service';
import { StdPkgController } from './std-pkg.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { B2BB2BStdPkgSchema, B2BStdPkg } from './entities/std-pkg.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: B2BStdPkg.name, schema: B2BB2BStdPkgSchema },
    ]),
  ],
  controllers: [StdPkgController],
  providers: [StdPkgService],
})
export class StdPkgModule {}
