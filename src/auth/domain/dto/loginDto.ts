import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginDto {
    
  @ApiProperty()
  @IsNotEmpty()
  Usuario: string;

  @ApiProperty()
  @IsNotEmpty()
  Clave: string;
}