import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UpdateUserService } from '../../application/updateUser.service';
import configuration from '../../../share/domain/resources/env.config';
import { MongoseModule } from '../../../share/infrastructure/mongo/mongo.Module';
import { UpdateUserController } from '../controller/updateUser.controller';
import { User, UserSchema } from 'src/share/domain/dto/user.entity';

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
  controllers: [UpdateUserController],
  providers: [UpdateUserService],
})
export class UpdateUserModule {}
