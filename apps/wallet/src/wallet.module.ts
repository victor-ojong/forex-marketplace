import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { DatabaseModule } from '@app/common';

@Module({
  imports: [DatabaseModule, WalletModule],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
