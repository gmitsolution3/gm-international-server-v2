import { Test, TestingModule } from '@nestjs/testing';
import { TouristApplicationController } from './tourist-application.controller';
import { TouristApplicationService } from './tourist-application.service';

describe('TouristApplicationController', () => {
  let controller: TouristApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TouristApplicationController],
      providers: [TouristApplicationService],
    }).compile();

    controller = module.get<TouristApplicationController>(TouristApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
