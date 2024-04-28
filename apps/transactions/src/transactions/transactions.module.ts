import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import {
  DatabaseModule,
  RATES_PACKAGE_NAME,
  RATES_SERVICE_NAME,
} from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from './entities/transaction.entity';
import { Wallet } from './entities/wallet.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { IntegrationsModule } from 'apps/rates/src/integrations/integrations.module';
import { RatesServices } from './currency.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Transactions, Wallet]),
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
    IntegrationsModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, RatesServices],
})
export class TransactionsModule {}
