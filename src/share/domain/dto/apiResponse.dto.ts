import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto {
  @ApiProperty()
  responseCode: number;

  @ApiProperty()
  message: string;

  data?: any;

  constructor(responseCode: number, message: string, data?: any) {
    this.responseCode = responseCode;
    this.message = message;
    this.data = data;
  }
}
