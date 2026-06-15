import { Test, TestingModule } from '@nestjs/testing';
import { BusinessPkgController } from './business-pkg.controller';
import { BusinessPkgService } from './business-pkg.service';

describe('BusinessPkgController', () => {
  let controller: BusinessPkgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessPkgController],
      providers: [BusinessPkgService],
    }).compile();

    controller = module.get<BusinessPkgController>(BusinessPkgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
