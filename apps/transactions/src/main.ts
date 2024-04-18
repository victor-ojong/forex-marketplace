import { NestFactory } from '@nestjs/core';
import { TransactionsModule } from './transactions/transactions.module';

async function bootstrap() {
  const app = await NestFactory.create(TransactionsModule);
  await app.listen(3002);
}
bootstrap();
