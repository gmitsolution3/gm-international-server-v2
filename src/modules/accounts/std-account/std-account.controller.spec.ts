import { Test, TestingModule } from '@nestjs/testing';
import { StdAccountController } from './std-account.controller';
import { StdAccountService } from './std-account.service';

describe('StdAccountController', () => {
  let controller: StdAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StdAccountController],
      providers: [StdAccountService],
    }).compile();

    controller = module.get<StdAccountController>(StdAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
