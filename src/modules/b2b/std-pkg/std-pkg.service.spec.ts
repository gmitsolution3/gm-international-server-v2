import { Test, TestingModule } from '@nestjs/testing';
import { StdPkgService } from './std-pkg.service';

describe('StdPkgService', () => {
  let service: StdPkgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StdPkgService],
    }).compile();

    service = module.get<StdPkgService>(StdPkgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
