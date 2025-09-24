import { HttpStatus, NotFoundException } from '@nestjs/common';
import { ErrorCodes } from '../errors/errorCodes';

export const nonNull = <T>(source: T | null, exc?: Error): T => {
  if (source === null)
    throw exc
      ? exc
      : new NotFoundException(HttpStatus.NOT_FOUND, {
          cause: { errorCodes: ErrorCodes._ERR_RECORD_NOT_FOUND }
        });

  return source;
};
export const nonNullish = <T>(source: T | null | undefined, exc?: Error): T => {
  if (source === null || source === undefined)
    throw exc
      ? exc
      : new NotFoundException(HttpStatus.NOT_FOUND, {
          cause: { errorCodes: ErrorCodes._ERR_RECORD_NOT_FOUND }
        });

  return source;
};
