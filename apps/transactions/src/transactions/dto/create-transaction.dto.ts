import { IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  walletID: string;

  @IsString()
  type: 'sell' | 'buy';

  @IsString()
  currencyPair: string;

  @IsNumber()
  sellPrice: number;

  @IsNumber()
  buyPrice: number;
}
