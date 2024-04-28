import { IsNumber, IsString } from 'class-validator';

export class SellTransactionDto {
  @IsString()
  walletID: string;

  @IsString()
  currencyPair: string;

  @IsNumber()
  sellPrice: number;
}
