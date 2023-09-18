import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import {
  OK,
  SERVICE_UNAVAILABLE,
} from '../../share/domain/resources/constants';
import config from '../../share/domain/resources/env.config';
import { ApiResponseDto } from '../../share/domain/dto/apiResponse.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../domain/dto/delete.entity';

/**
 *  @description Clase servicio responsable recibir el parametro y realizar la logica de negocio.
 *
 *  @author Celula Azure
 *
 */
@Injectable()
export class DeleteUserService {
  private readonly logger = new Logger(DeleteUserService.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  public async delete(username: string): Promise<ApiResponseDto> {
    try {
      const value = Object.values(username).toString();
      const userDb = await this.userModel.findOneAndDelete({
        username: value,
      });
      return new ApiResponseDto(HttpStatus.OK, OK);
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
