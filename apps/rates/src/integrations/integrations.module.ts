import { Module } from '@nestjs/common';
import { RatesService } from './integrations.service';
import { IntegrationsController } from './integrations.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RATES_PACKAGE_NAME, RATES_SERVICE_NAME } from '@app/common';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RATES_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          protoPath: join(__dirname, '../../../proto/rates.proto'),
          package: RATES_PACKAGE_NAME,
          url: '127.0.0.1:5002',
        },
      },
    ]),
  ],
  controllers: [IntegrationsController],
  providers: [RatesService],
})
export class IntegrationsModule {}
