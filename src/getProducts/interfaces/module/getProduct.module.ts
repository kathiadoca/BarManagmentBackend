import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import configuration from '../../../share/domain/resources/env.config';
import { MongoseModule } from '../../../share/infrastructure/mongo/mongo.Module';
import {
  Productos,
  ProductosSchema,
} from '../../../createProduct/domain/dto/products.entity';
import { CreateOrderController } from '../controller/getProduct.controller';
import { GetOrderService } from 'src/getProducts/application/getProducts.service';

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
  controllers: [CreateOrderController],
  providers: [GetOrderService],
})
export class GetOrderModule {}
