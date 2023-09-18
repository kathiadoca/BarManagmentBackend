import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthService } from '../../application/auth.service';
import configuration from '../../../share/domain/resources/env.config';
import { MongoseModule } from '../../../share/infrastructure/mongo/mongo.Module';
import { AuthController } from '../controller/auth.controller';
import { User, UserSchema } from 'src/share/domain/dto/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/application/jwt.strategy';
import { SECRET } from 'src/share/domain/resources/constants';
import { PassportModule } from '@nestjs/passport';

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
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    MongoseModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
