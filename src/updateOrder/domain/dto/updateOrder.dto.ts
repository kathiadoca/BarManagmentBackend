import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateOrderDTO {
  @ApiProperty()
  @IsNotEmpty()
  reference: string;

  @ApiProperty()
  @IsNotEmpty()
  status: number;
}
