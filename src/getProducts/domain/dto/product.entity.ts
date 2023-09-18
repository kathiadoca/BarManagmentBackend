import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ collection: 'Orders' })
export class Order extends Document {
  @Prop({ required: true })
  reference: string;

  @Prop({ required: true })
  orderTotal: number;

  @Prop({ required: true })
  expirationDate: Date;

  @Prop({ required: true })
  ean: string;

  @Prop({ required: true })
  status: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
