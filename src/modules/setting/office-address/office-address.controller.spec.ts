import { Test, TestingModule } from '@nestjs/testing';
import { OfficeAddressController } from './office-address.controller';
import { OfficeAddressService } from './office-address.service';

describe('OfficeAddressController', () => {
  let controller: OfficeAddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfficeAddressController],
      providers: [OfficeAddressService],
    }).compile();

    controller = module.get<OfficeAddressController>(OfficeAddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
