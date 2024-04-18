import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Integration } from 'apps/rates/src/integrations/entities/integration.entity';
import { Transactions } from 'apps/transactions/src/transactions/entities/transaction.entity';
import { User } from 'apps/user/src/user/entities/user.entity';
import { Wallet } from 'apps/wallet/src/wallet/entities/wallet.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (ConfigService: ConfigService) => ({
        type: 'mongodb',
        url: ConfigService.get('MONGODB_URI'),
        entities: [User, Wallet, Transactions, Integration],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
