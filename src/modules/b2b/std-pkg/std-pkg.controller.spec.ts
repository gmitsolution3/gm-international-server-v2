import { Test, TestingModule } from '@nestjs/testing';
import { StdPkgController } from './std-pkg.controller';
import { StdPkgService } from './std-pkg.service';

describe('StdPkgController', () => {
  let controller: StdPkgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StdPkgController],
      providers: [StdPkgService],
    }).compile();

    controller = module.get<StdPkgController>(StdPkgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
