import { Test, TestingModule } from '@nestjs/testing';
import { TouristAccountController } from './tourist-account.controller';
import { TouristAccountService } from './tourist-account.service';

describe('TouristAccountController', () => {
  let controller: TouristAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TouristAccountController],
      providers: [TouristAccountService],
    }).compile();

    controller = module.get<TouristAccountController>(TouristAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
