import { Test, TestingModule } from '@nestjs/testing';
import { MedicalReviewService } from './medical-review.service';

describe('MedicalReviewService', () => {
  let service: MedicalReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalReviewService],
    }).compile();

    service = module.get<MedicalReviewService>(MedicalReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
