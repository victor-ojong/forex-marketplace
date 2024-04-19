import { IsNumber, IsString } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  currency: string;

  @IsString()
  walletID: string;

  @IsNumber()
  amount: number;
}
