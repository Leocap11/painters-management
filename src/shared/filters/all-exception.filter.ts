import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { Response } from 'express';
import { buildErrorResponse, ErrorResponseDTO } from '../utils/utils';
import { ErrorCodes } from '../errors/errorCodes';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    this.logger.debug('Catched Generic Exception !!');
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    this.logger.error((exception as Error).message);
    this.logger.error((exception as Error).stack);

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message: string | null = (exception as Error).message || null;
    const environment = process.env.NODE_ENV;
    const allowStackTrace =
      environment === 'development' || environment === 'test';

    const errorResponse: ErrorResponseDTO = buildErrorResponse({
      status: httpStatus,
      errorCode: ErrorCodes._ERR_GENERIC,
      message,
      meta: {
        stack:
          allowStackTrace && exception instanceof Error
            ? exception.stack
            : undefined
      }
    });

    res.status(httpStatus).json(errorResponse);
  }
}
