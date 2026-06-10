import { Test, TestingModule } from '@nestjs/testing';
import { B2bUserController } from './b2b_user.controller';
import { B2bUserService } from './b2b_user.service';

describe('B2bUserController', () => {
  let controller: B2bUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [B2bUserController],
      providers: [B2bUserService],
    }).compile();

    controller = module.get<B2bUserController>(B2bUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
