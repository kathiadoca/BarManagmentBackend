import {
  Body,
  Controller,
  Inject,
  Logger,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { CreateProductService } from '../../application/createProduct.service';
import { ProcessTimeService } from '../../../share/domain/config/processTime.service';
import { ApiResponseDto } from '../../../share/domain/dto/apiResponse.dto';
import { JwtAuthGuard } from 'src/auth/application/jwt-auth.guard';
import { ProductsDTO } from 'src/createProduct/domain/dto/productsDto';

/**
 *  @description Archivo controlador responsable de manejar las solicitudes entrantes que llegan a un end point.
 *  En este caso seran posible acceder por medio de metodos http
 *
 *  @author Celula Azure
 *
 */
@ApiTags('create')
@Controller('products/create')
export class CreateOrderController {
  private readonly logger = new Logger(CreateOrderController.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    private readonly service: CreateProductService,
    private readonly processTimeService: ProcessTimeService,
  ) {}

  @ApiResponse({
    type: ApiResponseDto,
    status: 200,
  })
  //@UseGuards(JwtAuthGuard)
  @Post()
  async createUser(
    @Res() res: Response,
    @Body() payload: ProductsDTO,
  ): Promise<void> {
    const processTime = this.processTimeService.start();
    try {
      this.logger.log('Controller request message', {
        request: payload,
        transactionId: this.transactionId,
      });
      const serviceResponse = await this.service.createOrder(payload);
      res.status(serviceResponse.statusCode).json(serviceResponse);
    } finally {
      this.logger.log(`Consumo del servicio finalizado`, {
        totalProcessTime: processTime.end(),
        transactionId: this.transactionId,
      });
    }
  }
}
