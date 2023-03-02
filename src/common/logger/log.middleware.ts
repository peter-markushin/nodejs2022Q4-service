import {
  forwardRef,
  Inject,
  Injectable,
  LoggerService,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogService } from './log.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(forwardRef(() => LogService))
    private readonly logger: LoggerService,
  ) {}

  use(request: Request, response: Response, next: NextFunction) {
    this.logger.log(
      `Request: ${request.method} ${request.originalUrl}; ${JSON.stringify(
        request.body,
      )}`,
    );

    next();
  }
}
