import { Test, TestingModule } from '@nestjs/testing';
import { SearchingController } from './searching.controller';
import { SearchingService } from './searching.service';

describe('SearchingController', () => {
  let controller: SearchingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchingController],
      providers: [SearchingService],
    }).compile();

    controller = module.get<SearchingController>(SearchingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
