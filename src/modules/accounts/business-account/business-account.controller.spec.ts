import { Test, TestingModule } from '@nestjs/testing';
import { BusinessAccountController } from './business-account.controller';
import { BusinessAccountService } from './business-account.service';

describe('BusinessAccountController', () => {
  let controller: BusinessAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessAccountController],
      providers: [BusinessAccountService],
    }).compile();

    controller = module.get<BusinessAccountController>(BusinessAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
