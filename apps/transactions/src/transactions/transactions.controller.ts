import { Controller, Post, Get, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('/sell')
  sellOrder(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.sellOrder(createTransactionDto);
  }

  @Post('/buy')
  buyOrder(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.buyOrder(createTransactionDto);
  }

  @Get('/history')
  viewHistory() {
    return this.transactionsService.viewHistory('99999');
  }
}
