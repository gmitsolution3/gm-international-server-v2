import { PartialType } from '@nestjs/mapped-types';
import { CreateVideoGalleryDto } from './create-video-gallery.dto';

export class UpdateVideoGalleryDto extends PartialType(CreateVideoGalleryDto) {}
