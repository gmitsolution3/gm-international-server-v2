import { Test, TestingModule } from '@nestjs/testing';
import { VisaAccountController } from './visa-account.controller';
import { VisaAccountService } from './visa-account.service';

describe('VisaAccountController', () => {
  let controller: VisaAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisaAccountController],
      providers: [VisaAccountService],
    }).compile();

    controller = module.get<VisaAccountController>(VisaAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
