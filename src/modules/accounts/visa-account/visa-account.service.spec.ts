import { Test, TestingModule } from '@nestjs/testing';
import { VisaAccountService } from './visa-account.service';

describe('VisaAccountService', () => {
  let service: VisaAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisaAccountService],
    }).compile();

    service = module.get<VisaAccountService>(VisaAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
