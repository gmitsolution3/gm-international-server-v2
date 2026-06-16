import { Test, TestingModule } from '@nestjs/testing';
import { CscaApplicationsService } from './csca-applications.service';

describe('CscaApplicationsService', () => {
  let service: CscaApplicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CscaApplicationsService],
    }).compile();

    service = module.get<CscaApplicationsService>(CscaApplicationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
