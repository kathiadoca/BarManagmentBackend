import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import {
  OK,
  SERVICE_UNAVAILABLE,
} from '../../share/domain/resources/constants';
import config from '../../share/domain/resources/env.config';
import { ApiResponseDto } from '../../share/domain/dto/apiResponse.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateOrderDTO } from '../domain/dto/updateOrder.dto';
import { Order, OrderDocument } from '../domain/dto/order.entity';

/**
 *  @description Clase servicio responsable recibir el parametro y realizar la logica de negocio.
 *
 *  @author Celula Azure
 *
 */
@Injectable()
export class UpdateOrderService {
  private readonly logger = new Logger(UpdateOrderService.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  /**
   *  @description Metodo para buscar un usuario por 'username' en la base de datos
   *
   *
   */
  async findByIdAndUpdate(
    reference: string,
    status: number,
  ): Promise<OrderDocument | undefined> {
    return this.orderModel
      .findOneAndUpdate({ reference }, { status }, { new: true })
      .exec();
  }

  public async updateOrder(order: UpdateOrderDTO): Promise<ApiResponseDto> {
    try {
      //Obtiene el usuario de la base de datos
      const update = await this.findByIdAndUpdate(
        order.reference,
        order.status,
      );
      this.logger.log('create order request', {
        request: `${order.reference} ${order.status}`,
        transactionId: this.transactionId,
        response: update,
      });
      return new ApiResponseDto(HttpStatus.OK, OK);
    } catch (error) {
      this.logger.error(error.message, {
        transactionId: this.transactionId,
        stack: error.stack,
      });
      if (error.response && error.status) {
        throw new HttpException({ response: error.response }, error.status);
      }
      return new ApiResponseDto(
        HttpStatus.SERVICE_UNAVAILABLE,
        SERVICE_UNAVAILABLE,
      );
    }
  }
}
