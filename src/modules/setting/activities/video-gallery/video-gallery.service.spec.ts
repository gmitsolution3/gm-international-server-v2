import { Test, TestingModule } from '@nestjs/testing';
import { VideoGalleryService } from './video-gallery.service';

describe('VideoGalleryService', () => {
  let service: VideoGalleryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoGalleryService],
    }).compile();

    service = module.get<VideoGalleryService>(VideoGalleryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
