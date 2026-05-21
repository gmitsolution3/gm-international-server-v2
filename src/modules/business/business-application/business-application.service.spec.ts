import { Test, TestingModule } from '@nestjs/testing';
import { BusinessApplicationService } from './business-application.service';

describe('BusinessApplicationService', () => {
  let service: BusinessApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessApplicationService],
    }).compile();

    service = module.get<BusinessApplicationService>(BusinessApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
