import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ProductsDTO {

  @ApiProperty()
  @IsNotEmpty()
  id_Producto: number;

  @ApiProperty()
  @IsNotEmpty()
  nombre_Producto: string;

  @ApiProperty()
  @IsNotEmpty()
  costo: number;

  @ApiProperty()
  @IsNotEmpty()
  precio_Venta: number;

  @ApiProperty()
  @IsNotEmpty()
  cantidad: number;
}
