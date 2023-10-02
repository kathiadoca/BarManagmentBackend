import {
  ConflictException,
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
import { Productos, ProductosDocument, ProductosSchema } from '../domain/dto/products.entity';
import { ProductsDTO } from '../domain/dto/productsDto';

/**
 *  @description Clase servicio responsable recibir el parametro y realizar la logica de negocio.
 *
 *  @author Luis Torres
 *
 */
@Injectable()
export class CreateProductService {
  private readonly logger = new Logger(CreateProductService.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @InjectModel(Productos.name) private productsModel: Model<ProductosDocument>,
  ) {}

  /**
   *  @description Metodo para buscar un usuario por 'username' en la base de datos
   *
   *
   */
  async findOne(id_Producto: string): Promise<ProductosDocument | undefined> {
    return this.productsModel.findOne({ id_Producto }).exec();
  }

  public async createOrder(productsDTO: ProductsDTO): Promise<ApiResponseDto> {
    try {
      //Obtiene el usuario de la base de datos
      const productos = await this.findOne(productsDTO.id_Producto.toString());
      if (productos) throw new ConflictException('El producto ya existe en la base de datos');

      const productCreated = await this.productsModel.create(productsDTO);

      this.logger.log('Creando producto', {
        request: productsDTO,
        transactionId: this.transactionId,
        response: productCreated,
      });
      return new ApiResponseDto(HttpStatus.CREATED, OK);
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
