import { Test, TestingModule } from '@nestjs/testing';
import { B2bApplicationsService } from './b2b_applications.service';

describe('B2bApplicationsService', () => {
  let service: B2bApplicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [B2bApplicationsService],
    }).compile();

    service = module.get<B2bApplicationsService>(B2bApplicationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
