import { IsNumber, IsString } from 'class-validator';

export class BuyTransactionDto {
  @IsString()
  walletID: string;

  @IsString()
  currencyPair: string;

  @IsNumber()
  buyPrice: number;
}
