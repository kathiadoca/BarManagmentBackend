import { Body, Controller, Inject, Logger, Put, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { UpdateUserService } from '../../application/updateUser.service';
import { ProcessTimeService } from '../../../share/domain/config/processTime.service';
import { ApiResponseDto } from '../../../share/domain/dto/apiResponse.dto';
import { UpdateDTO } from 'src/updateUser/domain/dto/updateDto';

/**
 *  @description Archivo controlador responsable de manejar las solicitudes entrantes que llegan a un end point.
 *  En este caso seran posible acceder por medio de metodos http
 *
 *  @author Celula Azure
 *
 */
@ApiTags('update')
@Controller('user/update')
export class UpdateUserController {
  private readonly logger = new Logger(UpdateUserController.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    private readonly service: UpdateUserService,
    private readonly processTimeService: ProcessTimeService,
  ) {}

  @ApiResponse({
    type: ApiResponseDto,
    status: 200,
  })
  @Put()
  async updateUser(
    @Res() res: Response,
    @Body() body: UpdateDTO,
  ): Promise<void> {
    const processTime = this.processTimeService.start();
    try {
      this.logger.log('Controller request message', {
        request: body,
        transactionId: this.transactionId,
      });
      const serviceResponse = await this.service.update(body);
      res.status(serviceResponse.statusCode).json(serviceResponse);
    } finally {
      this.logger.log(`Consumo del servicio finalizado`, {
        totalProcessTime: processTime.end(),
        transactionId: this.transactionId,
      });
    }
  }
}
