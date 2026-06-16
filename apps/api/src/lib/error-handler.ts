import type { ErrorHandler } from 'elysia';

export const errorHandler: ErrorHandler = ({ error, set }) => {
  console.error('Error:', error);

  if (error instanceof Error) {
    const message = error.message;
    let status = 500;

    if (message.includes('Missing or invalid authorization')) {
      status = 401;
    } else if (message.includes('Invalid or expired token')) {
      status = 401;
    } else if (message.includes('User role not found')) {
      status = 403;
    } else if (message.includes('Forbidden')) {
      status = 403;
    } else if (message.includes('not found') || message.includes('Not found')) {
      status = 404;
    } else if (message.includes('already exists') || message.includes('duplicate')) {
      status = 409;
    } else if (
      message.includes('validation') ||
      message.includes('Validation') ||
      message.includes('Invalid')
    ) {
      status = 400;
    }

    set.status = status;
    return {
      error:
        status === 401
          ? 'UNAUTHORIZED'
          : status === 403
            ? 'FORBIDDEN'
            : status === 404
              ? 'NOT_FOUND'
              : 'ERROR',
      message,
      status,
    };
  }

  if (typeof error === 'object' && error !== null && 'status' in error) {
    const err = error as { status: number; message: string; code?: string };
    set.status = err.status;
    return {
      error: err.code || 'ERROR',
      message: err.message,
      status: err.status,
    };
  }

  set.status = 500;
  return {
    error: 'INTERNAL_ERROR',
    message: 'An unexpected error occurred',
    status: 500,
  };
};
