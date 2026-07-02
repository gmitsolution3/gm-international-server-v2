import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import cors from '@fastify/cors';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(cors, {
    origin: [
      'http://localhost:3000',
      'https://update-gm-international-client.vercel.app',
      'https://gm-international-v2.vercel.app',
      'https://www.gminternational.live', 
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], 
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 8080, '0.0.0.0');
}
bootstrap();
