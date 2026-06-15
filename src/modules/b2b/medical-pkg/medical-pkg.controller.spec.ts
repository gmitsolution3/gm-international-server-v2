import { Test, TestingModule } from '@nestjs/testing';
import { MedicalPkgController } from './medical-pkg.controller';
import { MedicalPkgService } from './medical-pkg.service';

describe('MedicalPkgController', () => {
  let controller: MedicalPkgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalPkgController],
      providers: [MedicalPkgService],
    }).compile();

    controller = module.get<MedicalPkgController>(MedicalPkgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
