import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as ExceptionFilterInterface,
  HttpException,
  HttpStatus,
  LoggerService
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class ExceptionFilter implements ExceptionFilterInterface {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: LoggerService
  ) {
  }

  catch(exception: any, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const { httpAdapter } = this.httpAdapterHost;

    let logMessage: string;
    let response: string | object;
    let status: number;

    if (exception instanceof HttpException) {
      logMessage = 'HttpException';
      response = exception.getResponse();
      status = exception.getStatus();
    } else {
      logMessage = 'Exception';
      response = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error'
      };
      status = HttpStatus.INTERNAL_SERVER_ERROR;

      this.logger.error(`Uncaught exception ${exception.message}`);
    }

    this.logger.log(
      `${logMessage}:`,
      {
        status: status,
        response: response
      }
    );

    httpAdapter.reply(
      context.getResponse(),
      response,
      status
    );
  }
}