import { Module } from '@nestjs/common';
import { MedAccountService } from './med-account.service';
import { MedAccountController } from './med-account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MedAccount, MedAccountSchema } from './entities/med-account.entity';
import { User, UserSchema } from '../../user/user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MedAccount.name, schema: MedAccountSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [MedAccountController],
  providers: [MedAccountService],
})
export class MedAccountModule {}
