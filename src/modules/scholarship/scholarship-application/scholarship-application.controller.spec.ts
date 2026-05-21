import { Test, TestingModule } from '@nestjs/testing';
import { ScholarshipApplicationController } from './scholarship-application.controller';
import { ScholarshipApplicationService } from './scholarship-application.service';

describe('ScholarshipApplicationController', () => {
  let controller: ScholarshipApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScholarshipApplicationController],
      providers: [ScholarshipApplicationService],
    }).compile();

    controller = module.get<ScholarshipApplicationController>(ScholarshipApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
