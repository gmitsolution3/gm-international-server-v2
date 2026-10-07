import { Test, TestingModule } from '@nestjs/testing';
import { InternProfileService } from './intern.service';

describe('InternService', () => {
  let service: InternProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternProfileService],
    }).compile();

    service = module.get<InternProfileService>(InternProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
