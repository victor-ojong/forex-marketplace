import { Controller, Post, Param, Get, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('/sell')
  sell(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.findOne(createTransactionDto);
  }

  @Post('/buy')
  buy(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.findOne(createTransactionDto);
  }

  @Get('/view-market')
  market(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }

  @Get('/history')
  history(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
