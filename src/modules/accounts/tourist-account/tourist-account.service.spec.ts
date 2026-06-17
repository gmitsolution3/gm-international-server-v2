import { Test, TestingModule } from '@nestjs/testing';
import { TouristAccountService } from './tourist-account.service';

describe('TouristAccountService', () => {
  let service: TouristAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TouristAccountService],
    }).compile();

    service = module.get<TouristAccountService>(TouristAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
