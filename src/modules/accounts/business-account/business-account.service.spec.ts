import { Test, TestingModule } from '@nestjs/testing';
import { BusinessAccountService } from './business-account.service';

describe('BusinessAccountService', () => {
  let service: BusinessAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessAccountService],
    }).compile();

    service = module.get<BusinessAccountService>(BusinessAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
