import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';

interface ErrorResponse {
  statusCode: number;
  error: string;
}

@Catch(MongoError)
export class MongoErrorFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let error: ErrorResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'internal server error',
    };

    switch (exception.code) {
      case 11000:
        error = {
          statusCode: HttpStatus.CONFLICT,
          error: 'already exists',
        };
        break;
      default:
    }

    response.status(error.statusCode).json({ error });
  }
}
