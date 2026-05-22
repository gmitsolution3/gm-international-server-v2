import { Test, TestingModule } from '@nestjs/testing';
import { VideoGalleryController } from './video-gallery.controller';
import { VideoGalleryService } from './video-gallery.service';

describe('VideoGalleryController', () => {
  let controller: VideoGalleryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoGalleryController],
      providers: [VideoGalleryService],
    }).compile();

    controller = module.get<VideoGalleryController>(VideoGalleryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
