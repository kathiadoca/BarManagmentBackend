import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './share/domain/resources/env.config';
import { GlobalModule } from './share/domain/config/global.module';
import { UpdateUserModule } from './updateUser/interfaces/module/updateUser.module';
import { CreateProductModule } from './createProduct/interfaces/module/createProducts.module';
import { AuthModule } from './auth/interfaces/module/auth.module';
import { GetOrderModule } from './getOrder/interfaces/module/getOrder.module';
import { UpdateOrderModule } from './updateOrder/interfaces/module/updateOrder.module';

@Module({
  providers: [Logger],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    //DeleteUserModule,
    //UpdateUserModule,
    AuthModule,
    CreateProductModule,
    //UpdateOrderModule,
    //GetOrderModule,
    GlobalModule,
  ],
})
export class AppModule {}
