import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { DeleteUserService } from '../../application/deleteUser.service';
import configuration from '../../../share/domain/resources/env.config';
import { User, UserSchema } from '../../domain/dto/delete.entity';
import { MongoseModule } from '../../../share/infrastructure/mongo/mongo.Module';
import { DeleteUserController } from '../controller/deleteUser.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongoseModule,
  ],
  controllers: [DeleteUserController],
  providers: [DeleteUserService],
})
export class DeleteUserModule {}
