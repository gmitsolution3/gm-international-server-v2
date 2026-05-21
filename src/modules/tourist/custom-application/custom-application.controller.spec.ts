import { Test, TestingModule } from '@nestjs/testing';
import { CustomApplicationController } from './custom-application.controller';
import { CustomApplicationService } from './custom-application.service';

describe('CustomApplicationController', () => {
  let controller: CustomApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomApplicationController],
      providers: [CustomApplicationService],
    }).compile();

    controller = module.get<CustomApplicationController>(CustomApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
