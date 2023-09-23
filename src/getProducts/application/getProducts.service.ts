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
import { Order, OrderDocument } from '../domain/dto/product.entity';

/**
 *  @description Clase servicio responsable recibir el parametro y realizar la logica de negocio.
 *
 *  @author Celula Azure
 *
 */
@Injectable()
export class GetOrderService {
  private readonly logger = new Logger(GetOrderService.name);
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
  async findOne(reference: string): Promise<OrderDocument | undefined> {
    return this.orderModel.findOne({ reference }).exec();
  }

  public async getOrder(reference: string): Promise<ApiResponseDto> {
    try {
      //Obtiene el usuario de la base de datos
      const userDb = await this.findOne(reference);
      //if (userDb) throw new ConflictException('User already exists');

      //const userCreated = await this.orderModel.create(reference);

      this.logger.log('create order request', {
        request: reference,
        transactionId: this.transactionId,
        response: userDb,
      });
      return new ApiResponseDto(HttpStatus.OK, OK, userDb);
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
