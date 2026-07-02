import { Test, TestingModule } from '@nestjs/testing';
import { VisaFromService } from './visa-from.service';

describe('VisaFromService', () => {
  let service: VisaFromService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisaFromService],
    }).compile();

    service = module.get<VisaFromService>(VisaFromService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
