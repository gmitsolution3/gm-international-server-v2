import { Test, TestingModule } from '@nestjs/testing';
import { BusinessApplicationController } from './business-application.controller';
import { BusinessApplicationService } from './business-application.service';

describe('BusinessApplicationController', () => {
  let controller: BusinessApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessApplicationController],
      providers: [BusinessApplicationService],
    }).compile();

    controller = module.get<BusinessApplicationController>(BusinessApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
