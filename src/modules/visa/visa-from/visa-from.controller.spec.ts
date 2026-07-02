import { Test, TestingModule } from '@nestjs/testing';
import { VisaFromController } from './visa-from.controller';
import { VisaFromService } from './visa-from.service';

describe('VisaFromController', () => {
  let controller: VisaFromController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisaFromController],
      providers: [VisaFromService],
    }).compile();

    controller = module.get<VisaFromController>(VisaFromController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
