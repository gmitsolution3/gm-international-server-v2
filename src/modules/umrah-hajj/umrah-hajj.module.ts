import { Module } from '@nestjs/common';
import { UmrahModule } from './umrah-pkg/umrah-pkg.module';
import { UmrahApplicationModule } from './umrah-application/umrah-application.module';

@Module({
  imports: [UmrahModule, UmrahApplicationModule],
})
export class UmrahHajjModule {}
