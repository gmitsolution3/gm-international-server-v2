import { Test, TestingModule } from '@nestjs/testing';
import { UmrahApplicationService } from './umrah-application.service';

describe('UmrahApplicationService', () => {
  let service: UmrahApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UmrahApplicationService],
    }).compile();

    service = module.get<UmrahApplicationService>(UmrahApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
