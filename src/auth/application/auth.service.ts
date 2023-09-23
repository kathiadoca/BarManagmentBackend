import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import config from '../../share/domain/resources/env.config';
import { ApiResponseDto } from '../../share/domain/dto/apiResponse.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from '../domain/dto/userDto';
import { User, UserDocument } from '../../share/domain/dto/user.entity';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from '../domain/dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../domain/dto/loginDto';

/**
 *  @description Clase servicio responsable recibir el parametro y realizar la logica de negocio.
 *
 *  @author Celula Azure
 *
 */
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtAuthService: JwtService,
  ) {}

  async register(userDTO: UserDTO): Promise<ApiResponseDto> {
    try {
      const userDb = await this.findOne(userDTO.Usuario);
      if (userDb)
        return new ApiResponseDto(
          HttpStatus.FORBIDDEN,
          'User already exists',
          userDb,
        );
      const { Clave } = userDTO;
      const plaintToHash = await hash(Clave, 10);
      userDTO = {
        ...userDTO,
        Clave: plaintToHash,
      };
      this.logger.log('obtaing user ', {
        transactionId: this.transactionId,
        response: userDTO,
      });
      const resDb = await this.userModel.create(userDTO);
      return new ApiResponseDto(201, 'Ok', resDb);
    } catch (error) {
      this.logger.error(error.message, {
        transactionId: this.transactionId,
        stack: error.stack,
      });
      if (error.response && error.status) {
        throw new HttpException({ response: error.response }, error.status);
      }
      /* return new ApiResponseDto(
        HttpStatus.SERVICE_UNAVAILABLE,
        SERVICE_UNAVAILABLE,
      ); */
    }
  }

  async login(userDTO: LoginDto): Promise<ApiResponseDto> {
    try {
      const { Usuario, Clave } = userDTO;
      const findUser = await this.findOne(Usuario);
      if (!findUser)
        return new ApiResponseDto(
          HttpStatus.NOT_FOUND,
          'User not exists',
          findUser,
        );
      const checkPassword = await compare(Clave, findUser.Clave);
      if (!checkPassword)
        return new ApiResponseDto(HttpStatus.FORBIDDEN, 'Password invalid');
      this.logger.log('obtaing user ', {
        transactionId: this.transactionId,
        response: userDTO,
      });
      const payload = { id: findUser._id, name: findUser.Nombre };
      const token = await this.jwtAuthService.sign(payload);
      const user = new LoginAuthDto(
        findUser.Usuario,
        findUser.Clave,
        token,
      );
      return new ApiResponseDto(201, 'Ok', user);
    } catch (error) {
      this.logger.error(error.message, {
        transactionId: this.transactionId,
        stack: error.stack,
      });
      if (error.response && error.status) {
        throw new HttpException({ response: error.response }, error.status);
      }
      /* return new ApiResponseDto(
        HttpStatus.SERVICE_UNAVAILABLE,
        SERVICE_UNAVAILABLE,
      ); */
    }
  }

  /**
   *  @description Metodo para buscar un usuario por 'username' en la base de datos
   *
   *
   */
  async findOne(Usuario: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ Usuario }).exec();
  }
}
