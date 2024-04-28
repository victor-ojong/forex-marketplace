import { NestFactory } from '@nestjs/core';
import { IntegrationsModule } from './integrations/integrations.module';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { RATES_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(IntegrationsModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: RATES_PACKAGE_NAME,
      protoPath: join(__dirname, '../../../proto/rates.proto'),
      url: '127.0.0.1:5002',
    },
  });
  await app.listen(3001);
}
bootstrap();
