import {
  Body,
  Controller,
  Inject,
  Logger,
  Put,
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
import { ProductsDTO } from 'src/product/domain/dto/productsDto';
import { UpdateProductService } from 'src/product/application/updateProduct.service';

/**
 *  @description Archivo controlador responsable de manejar las solicitudes entrantes que llegan a un end point.
 *  En este caso seran posible acceder por medio de metodos http
 *
 *  @author Luis Torres
 *
 */
@ApiTags('update')
@Controller('products')
export class UpdateController {
  private readonly logger = new Logger(UpdateController.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    private readonly service: UpdateProductService,
    private readonly processTimeService: ProcessTimeService,
  ) {}

  @ApiResponse({
    type: ApiResponseDto,
    status: 200,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('updateProducts')
  @Roles('administrador', 'cajero')
  async getOneProduct(
    @Res() res: Response,
    @Body() param: ProductsDTO
  ): Promise<void> {
    const processTime = this.processTimeService.start();
    try {
      this.logger.log('Controller request message', {
        request: '',
        transactionId: this.transactionId,
      });
      const serviceResponse = await this.service.updateOrder(param);
      res.status(200).json(serviceResponse);
    } finally {
      this.logger.log(`Consumo del servicio finalizado`, {
        totalProcessTime: processTime.end(),
        transactionId: this.transactionId,
      });
    }
  }
}
