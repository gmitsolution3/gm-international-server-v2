import { Test, TestingModule } from '@nestjs/testing';
import { VisaApplicationsController } from './visa-applications.controller';
import { VisaApplicationsService } from './visa-applications.service';

describe('VisaApplicationsController', () => {
  let controller: VisaApplicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisaApplicationsController],
      providers: [VisaApplicationsService],
    }).compile();

    controller = module.get<VisaApplicationsController>(VisaApplicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
