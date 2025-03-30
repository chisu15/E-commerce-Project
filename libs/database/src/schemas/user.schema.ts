import { GENDER, ROLE } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: GENDER, required: true, type: String })
  gender: GENDER;

  @Prop({ enum: ROLE, default: ROLE.USER, type: String })
  role: ROLE;

  @Prop()
  avatar?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
