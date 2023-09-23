import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDTO {
  @ApiProperty()
  @IsNotEmpty()
  Nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  Apellido: string;

  @ApiProperty()
  @IsNotEmpty()
  Telefono: string;

  @ApiProperty()
  @IsNotEmpty()
  Direccion: string;

  @ApiProperty()
  @IsNotEmpty()
  Usuario: string;

  @ApiProperty()
  @IsNotEmpty()
  Clave: string;

  @ApiProperty()
  @IsNotEmpty()
  Sede: string;

  @ApiProperty()
  @IsNotEmpty()
  Rol: string;
}
