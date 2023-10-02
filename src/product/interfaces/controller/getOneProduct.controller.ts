import {
  Controller,
  Get,
  Inject,
  Logger,
  Param,
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
import { GetOneProductService } from 'src/product/application/getOneProduct.service';
import { IdProductsDTO } from '../../../product/domain/dto/idProductsDto';

/**
 *  @description Archivo controlador responsable de manejar las solicitudes entrantes que llegan a un end point.
 *  En este caso seran posible acceder por medio de metodos http
 *
 *  @author Luis Torres
 *
 */
@ApiTags('get')
@Controller('products')
export class GetOneProductController {
  private readonly logger = new Logger(GetOneProductController.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    private readonly service: GetOneProductService,
    private readonly processTimeService: ProcessTimeService,
  ) {}

  @ApiResponse({
    type: ApiResponseDto,
    status: 200,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('getOneProducts')
  @Roles('administrador', 'cajero')
  async getOneProduct(
    @Res() res: Response,
    @Query() param: IdProductsDTO
  ): Promise<void> {
    const processTime = this.processTimeService.start();
    try {
      this.logger.log('Controller request message', {
        request: '',
        transactionId: this.transactionId,
      });
      const serviceResponse = await this.service.getOneProduct(param);
      res.status(serviceResponse.statusCode).json(serviceResponse);
    } finally {
      this.logger.log(`Consumo del servicio finalizado`, {
        totalProcessTime: processTime.end(),
        transactionId: this.transactionId,
      });
    }
  }
}
