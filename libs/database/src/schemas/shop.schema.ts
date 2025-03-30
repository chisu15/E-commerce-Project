import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { STATUS } from '@app/common';

export type ShopDocument = Shop & Document;

@Schema({ timestamps: true })
export class Shop {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ enum: STATUS, default: STATUS.PENDING, type: String })
  status: STATUS;

  @Prop({ required: true })
  createdBy: string;

  @Prop()
  description?: string;

  @Prop()
  avatar?: string;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
