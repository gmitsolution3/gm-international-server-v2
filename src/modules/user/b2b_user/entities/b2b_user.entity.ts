// export class B2bUser {
//   _id: string;

//   userName: string;

//   username: string;

//   email: string;

//   phone: string;

//   password: string;

//   userRole: string;

//   isActive: boolean;

//   b2bProfileId: string;

//   createdBy: string;

//   avatar: string;

//   createdAt: Date;

//   updatedAt: Date;
// }

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type B2bUserDocument = HydratedDocument<B2bUser>;

@Schema({
  timestamps: true,
  collection: 'B2B_users',
  versionKey: false,
})
export class B2bUser {
  @Prop({
    required: true,
    trim: true,
  })
  userName: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({
    required: true,
    trim: true,
  })
  phone: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
    default: 'b2b',
  })
  userRole: string;

  @Prop({
    default: true,
  })
  isActive: boolean;

  @Prop({
    required: true,
    unique: true,
  })
  b2bProfileId: string;

  @Prop({
    required: true,
  })
  createdBy: string;

  @Prop({
    default: '',
  })
  avatar: string;
}

export const B2bUserSchema = SchemaFactory.createForClass(B2bUser);