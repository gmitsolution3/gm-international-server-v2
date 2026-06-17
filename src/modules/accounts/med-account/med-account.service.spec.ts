import { Test, TestingModule } from '@nestjs/testing';
import { MedAccountService } from './med-account.service';

describe('MedAccountService', () => {
  let service: MedAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedAccountService],
    }).compile();

    service = module.get<MedAccountService>(MedAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
