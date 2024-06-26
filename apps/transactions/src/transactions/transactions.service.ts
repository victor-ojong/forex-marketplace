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
    const [baseCurrency, currency] =
      createTransactionDto.currencyPair.split('/');

    const amount = createTransactionDto.buyPrice;

    // check if user has the currency in his wallet

    const wallet = await this.getwallet(createTransactionDto.walletID);

    const currencyExist = wallet.filter((el) => el.currency === currency);

    if (wallet.length < 1) {
      return { status: 'fail', message: 'no wallet balance found' };
    }

    if (currencyExist.length < 1) {
      return {
        status: 'fail',
        message: `you have no balance in your wallet in ${currency}`,
      };
    }

    const exchangeValue = await this.getRatesValue(
      baseCurrency,
      currency,
      amount,
    );

    if (!this.isValidBalance(exchangeValue, amount)) {
      return {
        status: 'fail',
        message: `insufficient fund`,
      };
    }

    //1. subtract base value from wallet, add exchangeValue and currency as new wallet balance and save
    const newWallet = wallet.map((el) => {
      if (el.currency === currency) {
        el.amount -= amount;
      }
      return el;
    });
    // creating new wallet currency
    const addWallet = this.walletRepo.create({
      walletID: createTransactionDto.walletID,
      amount,
      currency: baseCurrency,
    });

    // wallet updating
    await this.walletRepo.save(newWallet.concat(addWallet));

    //2. create a transaction document and save it
    const newTransaction = this.transactionRepo.create(createTransactionDto);
    return await this.transactionRepo.save(newTransaction);
  }

  async sellOrder(createTransactionDto: CreateTransactionDto) {
    // get user input and do api grpc call to rates service
    // get API reference value

    //
    return createTransactionDto;
  }

  async viewHistory(walletID: string) {
    return await this.transactionRepo.find({ where: { walletID } });
  }

  async viewMarket() {
    //just get the market value and return
  }

  async isValidBalance(exchangeValue: number, userBalance: number) {
    return exchangeValue <= userBalance;
  }

  async getRatesValue(baseCurrency: string, currency: string, amount: number) {
    // do a grpc call and get rates using the base currency
    const rate = rates.conversion_rates[currency];

    return rate * amount;
  }

  async getwallet(walletID: string) {
    return await this.walletRepo.find({ where: { walletID } });
  }
}
