import { Test, TestingModule } from '@nestjs/testing';
import { MedAccountController } from './med-account.controller';
import { MedAccountService } from './med-account.service';

describe('MedAccountController', () => {
  let controller: MedAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedAccountController],
      providers: [MedAccountService],
    }).compile();

    controller = module.get<MedAccountController>(MedAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
