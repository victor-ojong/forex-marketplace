import { NestFactory } from '@nestjs/core';
import { TransactionsModule } from './transactions/transactions.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(TransactionsModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3002);
}
bootstrap();
