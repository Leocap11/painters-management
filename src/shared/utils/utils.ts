import { HttpStatus } from '@nestjs/common';

export interface SuccessResponseDTO<D> {
  outcome: true;
  data: D | null;
}
export interface ErrorResponseDTO {
  outcome: false;
  error: {
    status: HttpStatus;
    message: string | null;
    errorCode: string;
    meta: Record<PropertyKey, unknown>;
  };
}

export type ResponseDTO<D> = SuccessResponseDTO<D> | ErrorResponseDTO;

export const buildSuccessResponse = <T>(data: T): SuccessResponseDTO<T> => {
  return {
    outcome: true,
    data
  };
};

export const buildErrorResponse = (input: {
  status: HttpStatus;
  errorCode: string;
  message?: string | null;
  meta?: Record<PropertyKey, unknown>;
}): ErrorResponseDTO => {
  return {
    outcome: false,
    error: {
      status: input.status,
      message: input.message ?? null,
      errorCode: input.errorCode,
      meta: input.meta ?? {}
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Paged<D extends readonly any[]> {
  data: D;
  pagination: {
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class PagedResponseDto<D extends readonly any[]> {
  outcome!: true;
  data!: D;
  pagination!: {
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buildPagedResponse = <T extends readonly any[]>(
  data: T,
  pagination: {
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  }
): PagedResponseDto<T> => {
  return { outcome: true, data: data, pagination: pagination };
};
