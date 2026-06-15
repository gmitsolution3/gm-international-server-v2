import { Test, TestingModule } from '@nestjs/testing';
import { VisaRateService } from './visa-rate.service';

describe('VisaRateService', () => {
  let service: VisaRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisaRateService],
    }).compile();

    service = module.get<VisaRateService>(VisaRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
