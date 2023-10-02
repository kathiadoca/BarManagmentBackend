import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateProductService } from '../../application/createProduct.service';
import configuration from '../../../share/domain/resources/env.config';
import { MongoseModule } from '../../../share/infrastructure/mongo/mongo.Module';
import { CreateOrderController } from '../controller/createProducts.controller';
import { Productos, ProductosSchema } from '../../../product/domain/dto/products.entity';
import { GetOneProductController } from '../controller/getOneProduct.controller';
import { GetOrderService } from '../../../product/application/getProducts.service';
import { GetAllProductsController } from '../controller/getAllProducts.controller';
import { GetOneProductService } from '../../../product/application/getOneProduct.service';
import { UpdateProductService } from '../../../product/application/updateProduct.service';
import { UpdateController } from '../controller/updateProduct.controller';
import { DeleteController } from '../controller/deleteProduct.controller';
import { DeleteProductService } from 'src/product/application/deleteProduct.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forFeature([
      {
        name: Productos.name,
        schema: ProductosSchema,
      },
    ]),
    MongoseModule,
  ],
  controllers: [CreateOrderController, GetOneProductController, GetAllProductsController, UpdateController, DeleteController],
  providers: [CreateProductService, GetOrderService, GetOneProductService, UpdateProductService, DeleteProductService],
})
export class ProductModule {}
