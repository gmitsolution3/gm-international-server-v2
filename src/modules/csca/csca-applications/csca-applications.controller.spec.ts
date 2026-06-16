import { Test, TestingModule } from '@nestjs/testing';
import { CscaApplicationsController } from './csca-applications.controller';
import { CscaApplicationsService } from './csca-applications.service';

describe('CscaApplicationsController', () => {
  let controller: CscaApplicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CscaApplicationsController],
      providers: [CscaApplicationsService],
    }).compile();

    controller = module.get<CscaApplicationsController>(CscaApplicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
