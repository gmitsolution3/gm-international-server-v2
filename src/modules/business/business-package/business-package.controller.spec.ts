import { Test, TestingModule } from '@nestjs/testing';
import { BusinessPackageController } from './business-package.controller';
import { BusinessPackageService } from './business-package.service';

describe('BusinessPackageController', () => {
  let controller: BusinessPackageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessPackageController],
      providers: [BusinessPackageService],
    }).compile();

    controller = module.get<BusinessPackageController>(BusinessPackageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
