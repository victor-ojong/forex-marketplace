import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Integration } from 'apps/rates/src/integrations/entities/integration.entity';
import { Transactions } from 'apps/transactions/src/transactions/entities/transaction.entity';
import { User } from 'apps/user/src/user/entities/user.entity';
import { Wallet } from 'apps/wallet/src/wallet/entities/wallet.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://127.0.0.1:27017/forex',
      entities: [User, Wallet, Transactions, Integration],
      synchronize: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
})
export class DatabaseModule {}
