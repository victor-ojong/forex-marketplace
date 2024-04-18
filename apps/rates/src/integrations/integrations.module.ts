import { Module } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { IntegrationsController } from './integrations.controller';
import { DatabaseModule } from '@app/common';

@Module({
  controllers: [DatabaseModule, IntegrationsController],
  providers: [IntegrationsService],
})
export class IntegrationsModule {}
