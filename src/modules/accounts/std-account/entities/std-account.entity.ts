import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StdAccountDocument = StdAccount & Document;

@Schema({ collection: 'accountSAP', timestamps: true, versionKey: false })
export class StdAccount {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  userEmail: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  degree: string;

  @Prop({ required: true })
  university: string;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  advance: number;

  @Prop({
    type: {
      email: { type: String, required: true },
      phone: { type: String },
      userRole: { type: String },
      branchName: { type: String },
    },
  })
  accountHolder: {
    email: string;
    phone: string;
    userRole: string;
    branchName: string;
  };
  @Prop({required: false})
  missingDocuments?: string[]

  @Prop({ required: true })
  due: number;

  @Prop({ required: true })
  intake: string;
}

export const StdAccountSchema = SchemaFactory.createForClass(StdAccount);
