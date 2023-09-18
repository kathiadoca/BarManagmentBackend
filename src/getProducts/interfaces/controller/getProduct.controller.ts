import {
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { GetOrderService } from '../../application/getOrder.service';
import { ProcessTimeService } from '../../../share/domain/config/processTime.service';
import { ApiResponseDto } from '../../../share/domain/dto/apiResponse.dto';
import { JwtAuthGuard } from 'src/auth/application/jwt-auth.guard';

/**
 *  @description Archivo controlador responsable de manejar las solicitudes entrantes que llegan a un end point.
 *  En este caso seran posible acceder por medio de metodos http
 *
 *  @author Celula Azure
 *
 */
@ApiTags('create')
@Controller('order/getOder')
export class CreateOrderController {
  private readonly logger = new Logger(CreateOrderController.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    private readonly service: GetOrderService,
    private readonly processTimeService: ProcessTimeService,
  ) {}

  @ApiResponse({
    type: ApiResponseDto,
    status: 200,
  })
  @UseGuards(JwtAuthGuard)
  @Get('/:reference')
  async getOrder(
    @Res() res: Response,
    @Param('reference') reference: string,
  ): Promise<void> {
    console.log('controlador', reference);
    const processTime = this.processTimeService.start();
    try {
      this.logger.log('Controller request message', {
        request: reference,
        transactionId: this.transactionId,
      });
      const serviceResponse = await this.service.getOrder(reference);
      res.status(serviceResponse.responseCode).json(serviceResponse);
    } finally {
      this.logger.log(`Consumo del servicio finalizado`, {
        totalProcessTime: processTime.end(),
        transactionId: this.transactionId,
      });
    }
  }
}
