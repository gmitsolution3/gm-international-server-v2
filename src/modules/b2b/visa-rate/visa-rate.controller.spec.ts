import { Test, TestingModule } from '@nestjs/testing';
import { VisaRateController } from './visa-rate.controller';
import { VisaRateService } from './visa-rate.service';

describe('VisaRateController', () => {
  let controller: VisaRateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisaRateController],
      providers: [VisaRateService],
    }).compile();

    controller = module.get<VisaRateController>(VisaRateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
