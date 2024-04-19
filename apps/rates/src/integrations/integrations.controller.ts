import { Controller, Get, Param } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';

@Controller('rates')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Get('/:currency_code')
  getRates(@Param() currency_code: any) {
    return this.integrationsService.getRates(currency_code.currency_code);
  }
}
