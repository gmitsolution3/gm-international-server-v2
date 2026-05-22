import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageGalleryDocument = ImageGallery & Document;

@Schema({ timestamps: true, collection: 'image_gallery', versionKey: false })
export class ImageGallery {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  alt: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: Date })
  createdAt: Date;

  @Prop({ required: true })
  size: number;
}

export const ImageGallerySchema = SchemaFactory.createForClass(ImageGallery);
