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
import { IdProductsDTO } from '../domain/dto/idProductsDto';

/**
 *  @description Clase servicio responsable recibir el parametro y realizar la logica de negocio.
 *
 *  @author Luis Torres
 *
 */
@Injectable()
export class GetOneProductService {
  private readonly logger = new Logger(GetOneProductService.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @InjectModel(Productos.name) private productModel: Model<ProductosDocument>,
  ) {}

  /**
   *  @description Metodo para buscar un usuario por 'username' en la base de datos
   *
   *
   */
  /* async find(): Promise<ProductosDocument | undefined> {
    return this.productModel.find().exec();
  } */

  public async getOneProduct(param: IdProductsDTO): Promise<ApiResponseDto> {
    try {
      //Obtiene el usuario de la base de datos
      let id_Producto =  param.id_Producto;
      const userDb = await this.productModel.findOne({ id_Producto });
      //if (userDb) throw new ConflictException('User already exists');

      //const userCreated = await this.orderModel.create(reference);

      this.logger.log('get one product request', {
        request: '',
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
