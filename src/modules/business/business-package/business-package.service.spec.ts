import { Test, TestingModule } from '@nestjs/testing';
import { BusinessPackageService } from './business-package.service';

describe('BusinessPackageService', () => {
  let service: BusinessPackageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessPackageService],
    }).compile();

    service = module.get<BusinessPackageService>(BusinessPackageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
