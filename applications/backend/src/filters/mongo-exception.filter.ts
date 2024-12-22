import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    switch (exception.code) {
      case 11000: // Duplicate key error
        response.status(409).json({
          statusCode: 409,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: 'Duplicate key error: Resource already exists',
        });
        break;

      default:
        response.status(500).json({
          statusCode: 500,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: 'Internal server error',
        });
    }
  }
}
