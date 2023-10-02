import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class IdProductsDTO {

  @ApiProperty()
  @IsNotEmpty()
  id_Producto: string;
}
