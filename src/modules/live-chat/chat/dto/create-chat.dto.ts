import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateChatDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  adminIds?: Types.ObjectId[];

  @IsOptional()
  @IsEnum(['pending', 'accepted', 'closed'])
  status?: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsMongoId()
  acceptedBy?: Types.ObjectId;

  @IsOptional()
  @IsString()
  lastMessage?: string;

  @IsOptional()
  lastMessageAt?: Date;
}
