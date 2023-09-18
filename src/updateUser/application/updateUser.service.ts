import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  OK,
  SERVICE_UNAVAILABLE,
} from '../../share/domain/resources/constants';
import config from '../../share/domain/resources/env.config';
import { ApiResponseDto } from '../../share/domain/dto/apiResponse.dto';
import { UpdateDTO } from '../domain/dto/updateDto';
import { User, UserDocument } from '../../share/domain/dto/user.entity';

/**
 *  @description Clase servicio responsable recibir el parametro y realizar la logica de negocio.
 *
 *  @author Celula Azure
 *
 */
@Injectable()
export class UpdateUserService {
  private readonly logger = new Logger(UpdateUserService.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  /**
   *  @description Metodo para buscar un usuario por 'username' en la base de datos
   *
   *
   */
  async findOne(username: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  public async update(userDTO: UpdateDTO): Promise<ApiResponseDto> {
    try {
      const userDb = await this.findOne(userDTO.username);
      if (!userDb) throw new NotFoundException();

      await this.userModel.replaceOne({ username: userDTO.username }, userDTO);
      return new ApiResponseDto(HttpStatus.ACCEPTED, OK);
    } catch (error) {
      this.logger.error(error.message, {
        transactionId: this.transactionId,
        stack: error.stack,
      });
      if (error.response && error.status) {
        throw new HttpException({ response: error.response }, error.status);
      }
      return new ApiResponseDto(
        HttpStatus.SERVICE_UNAVAILABLE,
        SERVICE_UNAVAILABLE,
      );
    }
  }
}
