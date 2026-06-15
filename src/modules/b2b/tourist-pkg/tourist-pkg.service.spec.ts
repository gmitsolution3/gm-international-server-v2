import { Test, TestingModule } from '@nestjs/testing';
import { TouristPkgService } from './tourist-pkg.service';

describe('TouristPkgService', () => {
  let service: TouristPkgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TouristPkgService],
    }).compile();

    service = module.get<TouristPkgService>(TouristPkgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
