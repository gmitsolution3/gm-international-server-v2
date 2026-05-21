import { Test, TestingModule } from '@nestjs/testing';
import { MedicalApplicationController } from './medical-application.controller';
import { MedicalApplicationService } from './medical-application.service';

describe('MedicalApplicationController', () => {
  let controller: MedicalApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalApplicationController],
      providers: [MedicalApplicationService],
    }).compile();

    controller = module.get<MedicalApplicationController>(MedicalApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
