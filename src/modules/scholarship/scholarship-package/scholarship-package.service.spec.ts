import { Test, TestingModule } from '@nestjs/testing';
import { ScholarshipPackageService } from './scholarship-package.service';

describe('ScholarshipPackageService', () => {
  let service: ScholarshipPackageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScholarshipPackageService],
    }).compile();

    service = module.get<ScholarshipPackageService>(ScholarshipPackageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
