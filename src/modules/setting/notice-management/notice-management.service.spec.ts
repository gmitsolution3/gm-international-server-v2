import { Test, TestingModule } from '@nestjs/testing';
import { NoticeManagementService } from './notice-management.service';

describe('NoticeManagementService', () => {
  let service: NoticeManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoticeManagementService],
    }).compile();

    service = module.get<NoticeManagementService>(NoticeManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
