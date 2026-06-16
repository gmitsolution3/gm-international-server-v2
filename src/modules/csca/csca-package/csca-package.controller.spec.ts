import { Test, TestingModule } from '@nestjs/testing';
import { CscaPackageController } from './csca-package.controller';
import { CscaPackageService } from './csca-package.service';

describe('CscaPackageController', () => {
  let controller: CscaPackageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CscaPackageController],
      providers: [CscaPackageService],
    }).compile();

    controller = module.get<CscaPackageController>(CscaPackageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
