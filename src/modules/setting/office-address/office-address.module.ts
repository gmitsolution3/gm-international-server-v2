import { Module } from '@nestjs/common';
import { OfficeAddressService } from './office-address.service';
import { OfficeAddressController } from './office-address.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OfficeAddress, OfficeAddressSchema } from './entities/office-address.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OfficeAddress.name, schema: OfficeAddressSchema },
    ]),
  ],
  controllers: [OfficeAddressController],
  providers: [OfficeAddressService],
})
export class OfficeAddressModule {}
