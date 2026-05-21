import { Test, TestingModule } from '@nestjs/testing';
import { CustomApplicationService } from './custom-application.service';

describe('CustomApplicationService', () => {
  let service: CustomApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomApplicationService],
    }).compile();

    service = module.get<CustomApplicationService>(CustomApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
