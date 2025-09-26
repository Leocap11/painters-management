import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { buildErrorResponse, ErrorResponseDTO } from '../utils/utils';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';
import { ErrorCodes } from '../errors/errorCodes';
import { Env } from 'src/services/Env/EnvService';

const errorCodesMap: Record<
  string,
  { message: string; statusCode: HttpStatus; errorCode: string }
> = {
  P2002: {
    message: 'Unique constraint failed.',
    statusCode: HttpStatus.CONFLICT,
    errorCode: '_ERR_UNIQUE_CONSTRAINT_FIELD'
  },
  P2025: {
    message: 'Not found record with given id.',
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: '_ERR_RECORD_NOT_FOUND_WITH_ID'
  },
  P2003: {
    message: 'Not found record with given id.',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: '_ERR_RECORD_NOT_FOUND_WHIT_GIVEN_ID'
  },
  P2015: {
    message: 'A related record could not be found.',
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: ErrorCodes._ERR_RECORD_NOT_FOUND_WITH_ID
  }
};

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  constructor() {
    this.logger.log('created! 🎉;');
  }

  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost): void {
    this.logger.debug('catched prisma exception! 🔥');

    const code = exception.code;
    // log error if current prisma error code was not mapped
    if (!errorCodesMap[code]) {
      this.logger.error(
        `no mapped code ${exception.code} in prisma exception! 💣`
      );
      this.logger.error(exception.message);
      this.logger.error(exception.stack);
    }

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status =
      errorCodesMap[code]?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR;

    const message = errorCodesMap[code]?.message ?? '';
    const cause: Record<string, unknown> = exception.meta ?? {};
    const errorCode = errorCodesMap[code]?.errorCode ?? '';

    console.log(exception);
    if (Env.ENVIRONMENT === 'development') {
      cause['stack'] = exception.stack;
    }

    const response: ErrorResponseDTO = buildErrorResponse({
      status,
      errorCode,
      message,
      ...cause
    });

    res.status(status).json(response);
  }
}
