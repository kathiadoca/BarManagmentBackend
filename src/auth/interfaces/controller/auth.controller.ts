import { Body, Controller, Inject, Logger, Post, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from '../../application/auth.service';
import { ProcessTimeService } from '../../../share/domain/config/processTime.service';
import { ApiResponseDto } from '../../../share/domain/dto/apiResponse.dto';
import { UserDTO } from 'src/auth/domain/dto/userDto';
import { LoginDto } from 'src/auth/domain/dto/loginDto';

/**
 *  @description Archivo controlador responsable de manejar las solicitudes entrantes que llegan a un end point.
 *  En este caso seran posible acceder por medio de metodos http
 *
 *  @author Luis Torres
 *
 */
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    private readonly service: AuthService,
    private readonly processTimeService: ProcessTimeService,
  ) {}

  @ApiResponse({
    type: ApiResponseDto,
    status: 201,
  })
  @Post('register')
  async registerUser(
    @Body() body: UserDTO,
    @Res() res: Response,
  ): Promise<void> {
    const processTime = this.processTimeService.start();
    try {
      this.logger.log('Controller request message', {
        transactionId: this.transactionId,
      });
      const serviceResponse = await this.service.register(body);
      res.status(serviceResponse.statusCode).json(serviceResponse);
    } finally {
      this.logger.log(`Consumo del servicio finalizado`, {
        totalProcessTime: processTime.end(),
        transactionId: this.transactionId,
      });
    }
  }

  @ApiResponse({
    type: ApiResponseDto,
    status: 201,
  })
  @Post('login')
  async loginUser(@Body() body: LoginDto, @Res() res: Response): Promise<void> {
    const processTime = this.processTimeService.start();
    try {
      this.logger.log('Controller request message', {
        request: body,
        transactionId: this.transactionId,
      });
      const serviceResponse = await this.service.login(body);
      res.status(serviceResponse.statusCode).json(serviceResponse);
    } finally {
      this.logger.log(`Consumo del servicio finalizado`, {
        totalProcessTime: processTime.end(),
        transactionId: this.transactionId,
      });
    }
  }
}
