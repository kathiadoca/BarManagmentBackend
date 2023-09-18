import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { GetOrderService } from '../../application/getOrder.service';
import configuration from '../../../share/domain/resources/env.config';
import { MongoseModule } from '../../../share/infrastructure/mongo/mongo.Module';
import { CreateOrderController } from '../controller/getOrder.controller';
import {
  Productos,
  ProductosSchema,
} from '../../../createProduct/domain/dto/products.entity';

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
