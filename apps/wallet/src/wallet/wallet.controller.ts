import { Controller, Post, Body, Get } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('/credit')
  async credit(@Body() creditDto: CreateWalletDto) {
    // get wallet id from current loged in user
    return await this.walletService.deposit(creditDto);
  }

  @Post('/debit')
  async debit(@Body() creditDto: CreateWalletDto) {
    // get wallet id from current loged in user
    return await this.walletService.debit(creditDto);
  }

  @Get('/balance')
  async balance(@Body() walletID: any) {
    return await this.walletService.balance(walletID.walletID);
  }
}
