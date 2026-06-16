import { Test, TestingModule } from '@nestjs/testing';
import { CscaPackageService } from './csca-package.service';

describe('CscaPackageService', () => {
  let service: CscaPackageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CscaPackageService],
    }).compile();

    service = module.get<CscaPackageService>(CscaPackageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
