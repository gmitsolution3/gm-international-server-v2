import { Test, TestingModule } from '@nestjs/testing';
import { OfficeAddressService } from './office-address.service';

describe('OfficeAddressService', () => {
  let service: OfficeAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfficeAddressService],
    }).compile();

    service = module.get<OfficeAddressService>(OfficeAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
