import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [WalletModule],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
