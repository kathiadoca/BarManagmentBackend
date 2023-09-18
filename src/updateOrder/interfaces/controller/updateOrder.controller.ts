import {
  Body,
  Controller,
  Inject,
  Logger,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { UpdateOrderService } from '../../application/updateOrder.service';
import { ProcessTimeService } from '../../../share/domain/config/processTime.service';
import { ApiResponseDto } from '../../../share/domain/dto/apiResponse.dto';
import { JwtAuthGuard } from 'src/auth/application/jwt-auth.guard';
import { UpdateOrderDTO } from 'src/updateOrder/domain/dto/updateOrder.dto';

/**
 *  @description Archivo controlador responsable de manejar las solicitudes entrantes que llegan a un end point.
 *  En este caso seran posible acceder por medio de metodos http
 *
 *  @author Celula Azure
 *
 */
@ApiTags('update')
@Controller('order/update')
export class UpdateOrderController {
  private readonly logger = new Logger(UpdateOrderController.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    private readonly service: UpdateOrderService,
    private readonly processTimeService: ProcessTimeService,
  ) {}

  @ApiResponse({
    type: ApiResponseDto,
    status: 200,
  })
  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateOrder(
    @Res() res: Response,
    @Body() payload: UpdateOrderDTO,
  ): Promise<void> {
    const processTime = this.processTimeService.start();
    try {
      this.logger.log('Controller request message', {
        request: payload,
        transactionId: this.transactionId,
      });
      const serviceResponse = await this.service.updateOrder(payload);
      res.status(serviceResponse.responseCode).json(serviceResponse);
    } finally {
      this.logger.log(`Consumo del servicio finalizado`, {
        totalProcessTime: processTime.end(),
        transactionId: this.transactionId,
      });
    }
  }
}
