import { Test, TestingModule } from '@nestjs/testing';
import { B2bApplicationsController } from './b2b_applications.controller';
import { B2bApplicationsService } from './b2b_applications.service';

describe('B2bApplicationsController', () => {
  let controller: B2bApplicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [B2bApplicationsController],
      providers: [B2bApplicationsService],
    }).compile();

    controller = module.get<B2bApplicationsController>(B2bApplicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
