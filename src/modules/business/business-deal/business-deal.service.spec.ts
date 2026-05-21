import { Test, TestingModule } from '@nestjs/testing';
import { BusinessDealService } from './business-deal.service';

describe('BusinessDealService', () => {
  let service: BusinessDealService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessDealService],
    }).compile();

    service = module.get<BusinessDealService>(BusinessDealService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
