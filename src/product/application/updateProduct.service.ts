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
import { Productos, ProductosDocument } from '../domain/dto/products.entity';
import { ProductsDTO } from '../domain/dto/productsDto';

/**
 *  @description Clase servicio responsable recibir el parametro y realizar la logica de negocio.
 *
 *  @author Luis Torres
 *
 */
@Injectable()
export class UpdateProductService {
  private readonly logger = new Logger(UpdateProductService.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @InjectModel(Productos.name) private productModel: Model<ProductosDocument>,
  ) {}

  public async updateOrder(product: ProductsDTO): Promise<ApiResponseDto> {
    try {
      //Obtiene el usuario de la base de datos
      let id_Producto = product.id_Producto;
      const update = await this.productModel.findOneAndUpdate({ id_Producto }, product, { new: true });
      this.logger.log('create order request', {
        request: `${product.id_Producto}`,
        transactionId: this.transactionId,
        response: update,
      });
      return new ApiResponseDto(HttpStatus.OK, OK, update);
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
