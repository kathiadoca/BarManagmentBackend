import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OrderDTO {
  @ApiProperty()
  @IsNotEmpty()
  reference: string;

  @ApiProperty()
  @IsNotEmpty()
  orderTotal: number;

  @ApiProperty()
  @IsNotEmpty()
  expirationDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  ean: string;

  @ApiProperty()
  @IsNotEmpty()
  status: number;
}
