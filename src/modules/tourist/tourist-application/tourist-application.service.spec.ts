import { Test, TestingModule } from '@nestjs/testing';
import { TouristApplicationService } from './tourist-application.service';

describe('TouristApplicationService', () => {
  let service: TouristApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TouristApplicationService],
    }).compile();

    service = module.get<TouristApplicationService>(TouristApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
