import { Test, TestingModule } from '@nestjs/testing';
import { ScholarshipPackageController } from './scholarship-package.controller';
import { ScholarshipPackageService } from './scholarship-package.service';

describe('ScholarshipPackageController', () => {
  let controller: ScholarshipPackageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScholarshipPackageController],
      providers: [ScholarshipPackageService],
    }).compile();

    controller = module.get<ScholarshipPackageController>(ScholarshipPackageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
