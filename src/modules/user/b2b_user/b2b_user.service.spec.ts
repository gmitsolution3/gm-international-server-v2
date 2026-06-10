import { Test, TestingModule } from '@nestjs/testing';
import { B2bUserService } from './b2b_user.service';

describe('B2bUserService', () => {
  let service: B2bUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [B2bUserService],
    }).compile();

    service = module.get<B2bUserService>(B2bUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
