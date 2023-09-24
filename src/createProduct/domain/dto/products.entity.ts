import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductosDocument = Productos & Document;

@Schema({ collection: 'Products' })
export class Productos extends Document {
  @Prop({ required: true })
  id_Producto: number;

  @Prop({ required: true })
  Nombre: string;

  @Prop({ required: true })
  Costo: number;

  @Prop({ required: true })
  Precio_venta: number;

  @Prop({ required: true })
  Cantidad: number;

  @Prop({ required: true })
  Sede: string;
}

export const ProductosSchema = SchemaFactory.createForClass(Productos);