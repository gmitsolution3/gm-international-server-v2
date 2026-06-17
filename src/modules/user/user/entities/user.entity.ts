import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export class UserEntity {
  _id: string;
  username: string;
  email: string;
  phone: string;
  userRole: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    trim: true,
  })
  username: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  phone: string;

  @Prop({
    required: false,
  })
  branchName?: string;

  @Prop({
    default: 'user',
    enum: ['user', 'admin', 'office_admin'],
  })
  userRole: string;

  @Prop({
    default: '',
  })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
