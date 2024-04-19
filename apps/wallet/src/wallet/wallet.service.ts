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
    // find an existingwalletid with the same currency and add the currency if not create new currecny object with wallet id

    const currentWallet = await this.findByWalletID(createWalletDto.walletID);

    const currencyExist =
      currentWallet.filter((el) => el.currency === createWalletDto.currency)
        .length > 0;

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

  async findByWalletID(walletID: string) {
    return await this.walletRepo.find({ where: { walletID } });
  }
}
