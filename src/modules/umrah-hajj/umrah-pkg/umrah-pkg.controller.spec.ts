import { Test, TestingModule } from '@nestjs/testing';
import { UmrahPkgController } from './umrah-pkg.controller';
import { UmrahPkgService } from './umrah-pkg.service';

describe('UmrahPkgController', () => {
  let controller: UmrahPkgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UmrahPkgController],
      providers: [UmrahPkgService],
    }).compile();

    controller = module.get<UmrahPkgController>(UmrahPkgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
