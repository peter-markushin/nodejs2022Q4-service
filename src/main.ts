import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';
import { join } from 'path';
import * as dotenv from 'dotenv';
import * as process from 'process';
import { LogService } from "./common/logger/log.service";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.useLogger(app.get(LogService));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const apiDocContent = await readFile(
    join(__dirname, '..', 'doc', 'api.yaml'),
    { encoding: 'utf-8' },
  );
  const apiDoc = yaml.load(apiDocContent) as OpenAPIObject;

  SwaggerModule.setup('doc', app, apiDoc);

  await app.listen(process.env['PORT'] || 4000);
}
bootstrap();
