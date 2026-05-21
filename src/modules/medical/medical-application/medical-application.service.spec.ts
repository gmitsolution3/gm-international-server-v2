import { Test, TestingModule } from '@nestjs/testing';
import { MedicalApplicationService } from './medical-application.service';

describe('MedicalApplicationService', () => {
  let service: MedicalApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalApplicationService],
    }).compile();

    service = module.get<MedicalApplicationService>(MedicalApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
