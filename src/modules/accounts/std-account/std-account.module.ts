import { Module } from '@nestjs/common';
import { StdAccountService } from './std-account.service';
import { StdAccountController } from './std-account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StdAccount, StdAccountSchema } from './entities/std-account.entity';
import { User, UserSchema } from '../../user/user/entities/user.entity';
import {
  MedAccount,
  MedAccountSchema,
} from '../med-account/entities/med-account.entity';
import {
  BusinessAccount,
  BusinessAccountSchema,
} from '../business-account/entities/business-account.entity';
import {
  TouristAccount,
  TouristAccountSchema,
} from '../tourist-account/entities/tourist-account.entity';
import {
  VisaAccount,
  VisaAccountSchema,
} from '../visa-account/entities/visa-account.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StdAccount.name, schema: StdAccountSchema },
      { name: MedAccount.name, schema: MedAccountSchema },
      { name: BusinessAccount.name, schema: BusinessAccountSchema },
      { name: TouristAccount.name, schema: TouristAccountSchema },
      { name: VisaAccount.name, schema: VisaAccountSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [StdAccountController],
  providers: [StdAccountService],
})
export class StdAccountModule {}
