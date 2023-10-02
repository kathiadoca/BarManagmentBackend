import {
  Controller,
  Delete,
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
import { DeleteProductService } from 'src/product/application/deleteProduct.service';
import { IdProductsDTO } from 'src/product/domain/dto/idProductsDto';

/**
 *  @description Archivo controlador responsable de manejar las solicitudes entrantes que llegan a un end point.
 *  En este caso seran posible acceder por medio de metodos http
 *
 *  @author Luis Torres
 *
 */
@ApiTags('delete')
@Controller('products')
export class DeleteController {
  private readonly logger = new Logger(DeleteController.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    private readonly service: DeleteProductService,
    private readonly processTimeService: ProcessTimeService,
  ) {}

  @ApiResponse({
    type: ApiResponseDto,
    status: 200,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('deleteProducts')
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
      const serviceResponse = await this.service.deleteProduct(param);
      res.status(200).json(serviceResponse);
    } finally {
      this.logger.log(`Consumo del servicio finalizado`, {
        totalProcessTime: processTime.end(),
        transactionId: this.transactionId,
      });
    }
  }
}
