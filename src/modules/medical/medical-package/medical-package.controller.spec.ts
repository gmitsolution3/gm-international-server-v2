import { Test, TestingModule } from '@nestjs/testing';
import { MedicalPackageController } from './medical-package.controller';
import { MedicalPackageService } from './medical-package.service';

describe('MedicalPackageController', () => {
  let controller: MedicalPackageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalPackageController],
      providers: [MedicalPackageService],
    }).compile();

    controller = module.get<MedicalPackageController>(MedicalPackageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
