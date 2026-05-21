import { Test, TestingModule } from '@nestjs/testing';
import { ScholarshipApplicationService } from './scholarship-application.service';

describe('ScholarshipApplicationService', () => {
  let service: ScholarshipApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScholarshipApplicationService],
    }).compile();

    service = module.get<ScholarshipApplicationService>(ScholarshipApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
