import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { STATUS } from '@app/common'; // enum bạn cần định nghĩa

export type ShopDocument = Shop & Document;

@Schema({ timestamps: true })
export class Shop {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ type: String, enum: STATUS, default: STATUS.ACTIVE })
  status: STATUS;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop()
  description?: string;

  @Prop()
  avatar?: string;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
