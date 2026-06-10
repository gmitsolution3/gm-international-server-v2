import { Test, TestingModule } from '@nestjs/testing';
import { MedicalReviewController } from './medical-review.controller';
import { MedicalReviewService } from './medical-review.service';

describe('MedicalReviewController', () => {
  let controller: MedicalReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalReviewController],
      providers: [MedicalReviewService],
    }).compile();

    controller = module.get<MedicalReviewController>(MedicalReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
