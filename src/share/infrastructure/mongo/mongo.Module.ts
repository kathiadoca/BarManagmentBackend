import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from '../../../share/domain/resources/env.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => ({
        uri: configService.MONGO_URL,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [config.KEY],
    }),
  ],
  controllers: [],
  providers: [],
})
export class MongoseModule {}
