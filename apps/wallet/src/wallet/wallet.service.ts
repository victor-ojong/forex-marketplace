import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet) private walletRepo: Repository<Wallet>,
  ) {}
  async deposit(createWalletDto: CreateWalletDto) {
    const currentWallet = await this.findByWalletID(createWalletDto.walletID);

    const currencyExist =
      this.getCurrencyPairs(currentWallet, createWalletDto.currency).length > 0;

    if (currentWallet.length > 0 && currencyExist) {
      // if exist, filter and add then save the user docs
      const createdWallet = currentWallet.map((el) => {
        if (el.currency === createWalletDto.currency) {
          el.amount += createWalletDto.amount;
        }
        return el;
      });

      return await this.walletRepo.save(createdWallet);
    }

    // if not just create a new wallet pair
    const newWallet = this.walletRepo.create({
      ...createWalletDto,
    });
    return await this.walletRepo.save(newWallet);
  }

  async debit(debitWalletDto: CreateWalletDto) {
    const wallet = await this.findByWalletID(debitWalletDto.walletID);

    const currecnyExist = this.getCurrencyPairs(
      wallet,
      debitWalletDto.currency,
    );

    if (currecnyExist.length < 1) {
      return {
        message: `${debitWalletDto.currency} does not exist on your wallet`,
      };
    }

    //get the amount and minus it with the one that is on the db and save
    // but first check if the ammount is greater than available balance
    const canDebit = this.checkEligibleDebitAmount(
      currecnyExist.at(0).amount,
      debitWalletDto.amount,
    );

    if (!canDebit) {
      return {
        message: ` ${debitWalletDto.amount}.00 ${debitWalletDto.currency} is more than your ${debitWalletDto.currency} wallet balance`,
      };
    }
    const currentBalance = currecnyExist.map((el) => {
      el.amount -= debitWalletDto.amount;
      return el;
    });

    return await this.walletRepo.save(currentBalance);
  }

  async balance(walletID: string) {
    if (!walletID) {
      return {
        status: 'fail',
        message: 'invalid wallet address',
      };
    }
    const balance = await this.findByWalletID(walletID);

    const filteredBalance = balance.map((el) => {
      el.walletID = undefined;
      el._id = undefined;
      return el;
    });
    // format the result to make sense as balance here
    return { balance: filteredBalance };
  }

  async findByWalletID(walletID: string) {
    return await this.walletRepo.find({ where: { walletID } });
  }

  private getCurrencyPairs(walletArray: CreateWalletDto[], currency: string) {
    return walletArray.filter((el) => el.currency === currency);
  }

  private checkEligibleDebitAmount(walletAmount: number, debitAmount: number) {
    return walletAmount >= debitAmount ? true : false;
  }
}
