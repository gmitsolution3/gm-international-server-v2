import { Test, TestingModule } from '@nestjs/testing';
import { InternBatchService } from './batch.service';


describe('BatchService', () => {
  let service: InternBatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternBatchService],
    }).compile();

    service = module.get<InternBatchService>(InternBatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
