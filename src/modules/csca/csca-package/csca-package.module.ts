import { Module } from '@nestjs/common';
import { CscaPackageService } from './csca-package.service';
import { CscaPackageController } from './csca-package.controller';

@Module({
  controllers: [CscaPackageController],
  providers: [CscaPackageService],
})
export class CscaPackageModule {}
