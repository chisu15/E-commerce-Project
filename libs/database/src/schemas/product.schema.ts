import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type ProductDocument = Product & Document

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, unique: true })
  productCode: string

  @Prop({ required: true })
  title: string

  @Prop({ required: true, unique: true })
  slug: string

  @Prop()
  description?: string

  @Prop()
  price: number

  @Prop()
  originalPrice?: number

  @Prop()
  stock: number

  @Prop({ type: [String], default: [] })
  images?: string[]

  @Prop()
  thumbnail?: string

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: 'Shop', required: true })
  shopId: Types.ObjectId

  @Prop({ type: [String], default: [] })
  tags?: string[]

  @Prop({ enum: ['active', 'inactive', 'draft'], default: 'active' })
  status?: string

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy?: Types.ObjectId

  @Prop({
    type: [
      {
        name: String,
        price: Number,
        originalPrice: Number,
        stock: Number,
        thumbnail: String,
        attributes: { type: Object },
      },
    ],
    default: [],
  })
  variants: Array<{
    name: string
    price: number
    originalPrice?: number
    stock: number
    thumbnail?: string
    attributes: Record<string, string>
  }>
}

export const ProductSchema = SchemaFactory.createForClass(Product)
