import { Controller, Get, Param } from '@nestjs/common';
import { RatesService } from './integrations.service';

@Controller('rates')
export class IntegrationsController {
  constructor(private readonly integrationsService: RatesService) {}

  @Get('/:currency_code')
  getRates(@Param() currency_code: any) {
    return this.integrationsService.getCurrencyRates(
      currency_code.currency_code,
    );
  }
}
