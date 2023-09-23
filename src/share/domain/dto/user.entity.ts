import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'Users' })
export class User extends Document {
  @Prop({ required: true })
  Nombre: string;

  @Prop({ required: true })
  Apellido: string;

  @Prop({ required: true })
  Telefono: string;

  @Prop({ required: true })
  Direccion: string;

  @Prop({ required: true })
  Usuario: string;

  @Prop({ required: true })
  Clave: string;

  @Prop({ required: true })
  Sede: string;

  @Prop({ required: true })
  Rol: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
