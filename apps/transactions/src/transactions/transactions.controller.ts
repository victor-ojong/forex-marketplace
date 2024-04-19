import { Controller, Get, Param, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('/sell')
  sell(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Delete('/buy')
  buy(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }

  @Delete('/view-market')
  market(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }

  @Delete('/history')
  history(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
