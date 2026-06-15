import { Test, TestingModule } from '@nestjs/testing';
import { MedicalPkgService } from './medical-pkg.service';

describe('MedicalPkgService', () => {
  let service: MedicalPkgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalPkgService],
    }).compile();

    service = module.get<MedicalPkgService>(MedicalPkgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
