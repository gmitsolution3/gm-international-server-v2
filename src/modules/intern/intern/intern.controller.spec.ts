import { Test, TestingModule } from '@nestjs/testing';
import { InternProfileController } from './intern.controller';
import { InternProfileService } from './intern.service';

describe('InternController', () => {
  let controller: InternProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternProfileController],
      providers: [InternProfileService],
    }).compile();

    controller = module.get<InternProfileController>(InternProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
