import { Test, TestingModule } from '@nestjs/testing';
import { InternBatchController } from './batch.controller';
import { InternBatchService } from './batch.service';

describe('BatchController', () => {
  let controller: InternBatchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternBatchController],
      providers: [InternBatchService],
    }).compile();

    controller = module.get<InternBatchController>(InternBatchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
