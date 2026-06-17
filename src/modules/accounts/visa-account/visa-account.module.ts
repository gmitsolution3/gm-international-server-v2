import { Module } from '@nestjs/common';
import { VisaAccountService } from './visa-account.service';
import { VisaAccountController } from './visa-account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VisaAccount, VisaAccountSchema } from './entities/visa-account.entity';
import { User, UserSchema } from '../../user/user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VisaAccount.name, schema: VisaAccountSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [VisaAccountController],
  providers: [VisaAccountService],
})
export class VisaAccountModule {}
