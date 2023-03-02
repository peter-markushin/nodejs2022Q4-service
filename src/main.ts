import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from './app.module';
import { LogLevel, ValidationPipe } from "@nestjs/common";
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';
import { join } from 'path';
import * as dotenv from 'dotenv';
import * as process from 'process';
import { LogService } from "./common/logger/log.service";
import { ExceptionFilter } from "./common/logger/exception-filter";
import { LoggingInterceptor } from "./common/logger/log.interceptor";
import { env } from "node:process";
import { JwtGuard } from "./auth/guard/jwt.guard";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  const logService = app.get(LogService);
  const httpAdapterHost = app.get(HttpAdapterHost);
  const orderedLogLevels: LogLevel[] = ['error', 'warn', 'log', 'verbose', 'debug'];

  logService.setLogLevels(
    orderedLogLevels.slice(0, orderedLogLevels.indexOf(env.LOG_LEVEL as LogLevel) + 1)
  );

  app.useLogger(logService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new ExceptionFilter(httpAdapterHost, logService));
  app.useGlobalInterceptors(new LoggingInterceptor(logService));
  app.useGlobalGuards(new JwtGuard());

  process.on('uncaughtException', (error, origin) => {
    logService.error(`Uncaught process exception "${error.message}" at ${origin}`);

    process.exit(127);
  });

  process.on('unhandledRejection', (reason) => {
    logService.error(`Unhandled Rejection "${reason}"`);
  });

  const apiDocContent = await readFile(
    join(__dirname, '..', 'doc', 'api.yaml'),
    { encoding: 'utf-8' },
  );
  const apiDoc = yaml.load(apiDocContent) as OpenAPIObject;

  SwaggerModule.setup('doc', app, apiDoc);

  await app.listen(process.env['PORT'] || 4000);
}
bootstrap();
