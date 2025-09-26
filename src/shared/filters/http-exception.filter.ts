import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger
} from '@nestjs/common';
import { Response } from 'express';
import { buildErrorResponse, ErrorResponseDTO } from '../utils/utils';
import { ErrorCodes } from '../errors/errorCodes';

const isErrorCodeCause = (cause: unknown): cause is { errorCode: string } => {
  if (typeof cause !== 'object') return false;
  if (Array.isArray(cause)) return false;
  const recordCause = cause as Record<PropertyKey, unknown>;
  return !!recordCause.errorCode && typeof recordCause.errorCode === 'string';
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor() {
    this.logger.log('created! 🎉;');
  }

  catch(exception: HttpException, host: ArgumentsHost): void {
    this.logger.debug('catched http exception! 🔥');
    this.logger.error(exception);

    const exceptionResponse: string | object = exception.getResponse();
    const responseMessage: unknown =
      exceptionResponse instanceof Object
        ? (exceptionResponse as Record<string, unknown>)['message']
        : null;

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const message: string = exception.message;
    const nativeCause: unknown = exception.cause;

    let cause: unknown;
    let errorCode: string = ErrorCodes._ERR_GENERIC;
    if (isErrorCodeCause(nativeCause)) {
      const { errorCode: nativeErrorCode, ...rest } = nativeCause;
      errorCode = nativeErrorCode;
      cause = rest;
    } else {
      cause = nativeCause;
    }

    const response: ErrorResponseDTO = buildErrorResponse({
      message,
      errorCode,
      status,
      meta: {
        ...(cause instanceof Object ? { ...cause } : { details: cause }),
        ...(responseMessage ? { info: responseMessage } : {})
      }
    });

    res.status(status).json(response);
  }
}
