import { Controller, Delete, Inject, Logger, Query, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { DeleteUserService } from '../../application/deleteUser.service';
import { ProcessTimeService } from '../../../share/domain/config/processTime.service';
import { ApiResponseDto } from '../../../share/domain/dto/apiResponse.dto';

/**
 *  @description Archivo controlador responsable de manejar las solicitudes entrantes que llegan a un end point.
 *  En este caso seran posible acceder por medio de metodos http
 *
 *  @author Celula Azure
 *
 */
@ApiTags('delete')
@Controller('user/delete')
export class DeleteUserController {
  private readonly logger = new Logger(DeleteUserController.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    private readonly service: DeleteUserService,
    private readonly processTimeService: ProcessTimeService,
  ) {}

  @ApiResponse({
    type: ApiResponseDto,
    status: 200,
  })
  @Delete()
  async deleteUser(
    @Res() res: Response,
    @Query() username: string,
  ): Promise<void> {
    const processTime = this.processTimeService.start();
    try {
      this.logger.log('Controller request message', {
        request: username,
        transactionId: this.transactionId,
      });
      const serviceResponse = await this.service.delete(username);
      res.status(serviceResponse.statusCode).json(serviceResponse);
    } finally {
      this.logger.log(`Consumo del servicio finalizado`, {
        totalProcessTime: processTime.end(),
        transactionId: this.transactionId,
      });
    }
  }
}
