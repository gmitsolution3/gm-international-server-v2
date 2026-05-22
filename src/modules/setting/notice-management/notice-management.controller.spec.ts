import { Test, TestingModule } from '@nestjs/testing';
import { NoticeManagementController } from './notice-management.controller';
import { NoticeManagementService } from './notice-management.service';

describe('NoticeManagementController', () => {
  let controller: NoticeManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoticeManagementController],
      providers: [NoticeManagementService],
    }).compile();

    controller = module.get<NoticeManagementController>(NoticeManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
