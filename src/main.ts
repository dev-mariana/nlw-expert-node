import fastifyCookie from '@fastify/cookie';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ZodExceptionFilter } from '@shared/filters/zod-exception';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.register(fastifyCookie, {
    secret: process.env.SECRET_KEY,
    hook: 'onRequest',
  });

  app.useGlobalFilters(new ZodExceptionFilter());

  await app.listen(4000);
}
bootstrap();
