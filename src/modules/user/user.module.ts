import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { B2bUserModule } from './b2b_user/b2b_user.module';
import { B2bApplicationsModule } from './b2b_applications/b2b_applications.module';


@Module({
  imports: [
    UserModule,
    B2bUserModule,
    B2bApplicationsModule,
  ],
})
export class RootUserModules {}
