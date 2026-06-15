import { Test, TestingModule } from '@nestjs/testing';
import { BusinessPkgService } from './business-pkg.service';

describe('BusinessPkgService', () => {
  let service: BusinessPkgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessPkgService],
    }).compile();

    service = module.get<BusinessPkgService>(BusinessPkgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
