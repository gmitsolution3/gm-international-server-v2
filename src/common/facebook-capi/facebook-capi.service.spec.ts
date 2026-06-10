import { Test, TestingModule } from '@nestjs/testing';
import { FacebookCapiService } from './facebook-capi.service';

describe('FacebookCapiService', () => {
  let service: FacebookCapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacebookCapiService],
    }).compile();

    service = module.get<FacebookCapiService>(FacebookCapiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
