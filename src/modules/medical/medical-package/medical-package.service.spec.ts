import { Test, TestingModule } from '@nestjs/testing';
import { MedicalPackageService } from './medical-package.service';

describe('MedicalPackageService', () => {
  let service: MedicalPackageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalPackageService],
    }).compile();

    service = module.get<MedicalPackageService>(MedicalPackageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
