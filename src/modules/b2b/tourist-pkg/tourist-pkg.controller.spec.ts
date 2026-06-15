import { Test, TestingModule } from '@nestjs/testing';
import { TouristPkgController } from './tourist-pkg.controller';
import { TouristPkgService } from './tourist-pkg.service';

describe('TouristPkgController', () => {
  let controller: TouristPkgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TouristPkgController],
      providers: [TouristPkgService],
    }).compile();

    controller = module.get<TouristPkgController>(TouristPkgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
