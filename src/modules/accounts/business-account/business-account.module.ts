import { Module } from '@nestjs/common';
import { BusinessAccountService } from './business-account.service';
import { BusinessAccountController } from './business-account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BusinessAccount,
  BusinessAccountSchema,
} from './entities/business-account.entity';
import { User, UserSchema } from '../../user/user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BusinessAccount.name, schema: BusinessAccountSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [BusinessAccountController],
  providers: [BusinessAccountService],
})
export class BusinessAccountModule {}
