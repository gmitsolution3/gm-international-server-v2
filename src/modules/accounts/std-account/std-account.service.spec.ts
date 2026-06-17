import { Test, TestingModule } from '@nestjs/testing';
import { StdAccountService } from './std-account.service';

describe('StdAccountService', () => {
  let service: StdAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StdAccountService],
    }).compile();

    service = module.get<StdAccountService>(StdAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
