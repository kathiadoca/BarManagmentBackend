import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './share/domain/resources/env.config';
import { GlobalModule } from './share/domain/config/global.module';
import { CreateProductModule } from './createProduct/interfaces/module/createProducts.module';
import { AuthModule } from './auth/interfaces/module/auth.module';

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
