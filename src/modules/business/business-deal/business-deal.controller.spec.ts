import { Test, TestingModule } from '@nestjs/testing';
import { BusinessDealController } from './business-deal.controller';
import { BusinessDealService } from './business-deal.service';

describe('BusinessDealController', () => {
  let controller: BusinessDealController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessDealController],
      providers: [BusinessDealService],
    }).compile();

    controller = module.get<BusinessDealController>(BusinessDealController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
