import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ProductsDTO {

  @ApiProperty()
  @IsNotEmpty()
  id_Producto: number;

  @ApiProperty()
  @IsNotEmpty()
  Nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  Costo: number;

  @ApiProperty()
  @IsNotEmpty()
  Precio_venta: number;

  @ApiProperty()
  @IsNotEmpty()
  Cantidad: number;

  @ApiProperty()
  @IsNotEmpty()
  Sede: string;
}
