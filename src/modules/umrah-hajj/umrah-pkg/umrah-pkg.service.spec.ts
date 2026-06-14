import { Test, TestingModule } from '@nestjs/testing';
import { UmrahPkgService } from './umrah-pkg.service';

describe('UmrahPkgService', () => {
  let service: UmrahPkgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UmrahPkgService],
    }).compile();

    service = module.get<UmrahPkgService>(UmrahPkgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
