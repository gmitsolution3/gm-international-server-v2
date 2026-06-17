import { Module } from '@nestjs/common';
import { TouristAccountService } from './tourist-account.service';
import { TouristAccountController } from './tourist-account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TouristAccount,
  TouristAccountSchema,
} from './entities/tourist-account.entity';
import { User, UserSchema } from '../../user/user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TouristAccount.name, schema: TouristAccountSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [TouristAccountController],
  providers: [TouristAccountService],
})
export class TouristAccountModule {}
