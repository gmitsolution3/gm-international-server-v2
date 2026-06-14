import { Test, TestingModule } from '@nestjs/testing';
import { UmrahApplicationController } from './umrah-application.controller';
import { UmrahApplicationService } from './umrah-application.service';

describe('UmrahApplicationController', () => {
  let controller: UmrahApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UmrahApplicationController],
      providers: [UmrahApplicationService],
    }).compile();

    controller = module.get<UmrahApplicationController>(UmrahApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
