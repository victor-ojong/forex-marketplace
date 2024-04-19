import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactions } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionRepo: Repository<Transactions>,
    @InjectRepository(Wallet) private walletRepo: Repository<Wallet>,
  ) {}

  async buyOrder(createTransactionDto: CreateTransactionDto) {
    // get user input and do api grpc call to rates service
    // get API reference value

    //
    return 'This action adds a new transaction';
  }

  async sellOrder(createTransactionDto: CreateTransactionDto) {
    // get user input and do api grpc call to rates service
    // get API reference value

    //
    return 'This action adds a new transaction';
  }
  async calculateExchangeValue(rate: number, amount: number) {
    return rate * amount;
  }

  async viewHistory(walletID: string) {
    return await this.transactionRepo.find({ where: { walletID } });
    //
  }

  async viewMarket() {
    //just get the market value and return
  }

  async checkValidBalance() {
    //
  }

  async getRates(rates: any, baseCurrency: string, currency: string) {
    //
    rates.conversion_rates[currency];
  }
}
