import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { BuyTransactionDto } from './dto/buy-forex-transaction.dto';
import { SellTransactionDto } from './dto/sell-forex-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('/buy')
  buyOrder(@Body() createTransactionDto: BuyTransactionDto) {
    return this.transactionsService.buyOrder(createTransactionDto);
  }
  @Post('/sell')
  sellOrder(@Body() createTransactionDto: SellTransactionDto) {
    return this.transactionsService.sellOrder(createTransactionDto);
  }

  @Get('/history/:walletID')
  viewHistory(@Param('walletID') walletID: string) {
    return this.transactionsService.viewHistory(walletID);
  }
}
