import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //only allow properties that are defined in the DTO
      forbidNonWhitelisted: true, //throw an error if a property that is not defined in the DTO is sent
      transform: true, //transform the data to the DTO type
    }),
  );
  await app.listen(process.env.PORT || 3000);
  console.log('Server started on', process.env.PORT || 3000);
}
bootstrap();
