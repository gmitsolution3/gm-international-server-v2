import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VideoGalleryDocument = VideoGallery & Document;

@Schema({ timestamps: true, collection: 'video_gallery', versionKey: false })
export class VideoGallery {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true, type: Date })
  createdAt: Date;

  @Prop({
    required: true,
    enum: ['published', 'draft', 'archived'],
    default: 'published',
  })
  status: string;
}

export const VideoGallerySchema = SchemaFactory.createForClass(VideoGallery);
