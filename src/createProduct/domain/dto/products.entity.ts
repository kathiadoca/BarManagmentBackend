import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductosDocument = Productos & Document;

@Schema({ collection: 'Products' })
export class Productos extends Document {
  @Prop({ required: true })
  id_Producto: number;

  @Prop({ required: true })
  nombre_Producto: string;

  @Prop({ required: true })
  costo: number;

  @Prop({ required: true })
  precio_Venta: number;

  @Prop({ required: true })
  cantidad: number;
}

export const ProductosSchema = SchemaFactory.createForClass(Productos);