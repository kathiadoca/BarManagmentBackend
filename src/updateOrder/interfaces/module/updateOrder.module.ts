import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UpdateOrderService } from '../../application/updateOrder.service';
import configuration from '../../../share/domain/resources/env.config';
import { MongoseModule } from '../../../share/infrastructure/mongo/mongo.Module';
import { UpdateOrderController } from '../controller/updateOrder.controller';
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
  controllers: [UpdateOrderController],
  providers: [UpdateOrderService],
})
export class UpdateOrderModule {}
