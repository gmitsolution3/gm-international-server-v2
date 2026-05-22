import { PartialType } from '@nestjs/mapped-types';
import { CreateImageGalleryDto } from './create-image-gallery.dto';

export class UpdateImageGalleryDto extends PartialType(CreateImageGalleryDto) {}
