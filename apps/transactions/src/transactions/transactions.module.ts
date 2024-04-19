import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { DatabaseModule } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from './entities/transaction.entity';
import { Wallet } from './entities/wallet.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Transactions, Wallet])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
