import {
  Controller,
  Get,
  Inject,
  Logger,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { ProcessTimeService } from '../../../share/domain/config/processTime.service';
import { ApiResponseDto } from '../../../share/domain/dto/apiResponse.dto';
import { JwtAuthGuard } from '../../../auth/application/jwt-auth.guard';
import { RolesGuard } from '../../../auth/application/roles.guard';
import { Roles } from '../../../auth/application/roles.decorator';
import { ProductsDTO } from '../../domain/dto/productsDto';
import { GetOrderService } from 'src/product/application/getProducts.service';

/**
 *  @description Archivo controlador responsable de manejar las solicitudes entrantes que llegan a un end point.
 *  En este caso seran posible acceder por medio de metodos http
 *
 *  @author Luis Torres
 *
 */
@ApiTags('get')
@Controller('products/getAllProducts')
export class GetAllProductsController {
  private readonly logger = new Logger(GetAllProductsController.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    private readonly service: GetOrderService,
    private readonly processTimeService: ProcessTimeService,
  ) {}

  @ApiResponse({
    type: ApiResponseDto,
    status: 200,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @Roles('administrador', 'cajero')
  async getProducts(
    @Res() res: Response,
  ): Promise<void> {
    const processTime = this.processTimeService.start();
    try {
      this.logger.log('Controller request message', {
        request: '',
        transactionId: this.transactionId,
      });
      const serviceResponse = await this.service.getProduct();
      res.status(serviceResponse.statusCode).json(serviceResponse);
    } finally {
      this.logger.log(`Consumo del servicio finalizado`, {
        totalProcessTime: processTime.end(),
        transactionId: this.transactionId,
      });
    }
  }
}
