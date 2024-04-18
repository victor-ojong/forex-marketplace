import { NestFactory } from '@nestjs/core';
import { IntegrationsModule } from './integrations/integrations.module';

async function bootstrap() {
  const app = await NestFactory.create(IntegrationsModule);
  await app.listen(3001);
}
bootstrap();
