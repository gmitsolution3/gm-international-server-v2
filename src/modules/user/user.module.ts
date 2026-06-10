import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { B2bUserModule } from './b2b_user/b2b_user.module';


@Module({
  imports: [UserModule, B2bUserModule],
})
export class RootUserModules {}
