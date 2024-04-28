import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export interface ConversionRate {
  currencyCode: string;
  rate: number;
}

export interface CurrencyResponse {
  result: string;
  timeLastUpdateUtc: string;
  timeNextUpdateUtc: string;
  baseCode: string;
  conversionRates: ConversionRate[];
}

export interface CreateRatesMessage {
  baseCurrency: string;
}

export const RATES_PACKAGE_NAME = 'rates';

export interface RatesServiceClient {
  getCurrencyRates(request: CreateRatesMessage): Observable<CurrencyResponse>;
}

export interface RatesServiceController {
  getCurrencyRates(
    request: CreateRatesMessage,
  ): Promise<CurrencyResponse> | Observable<CurrencyResponse>;
}

export function RatesServiceControllerMethods() {
  return function (constructor) {
    const grpcMethods: string[] = ['getCurrencyRates'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('RatesService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const RATES_SERVICE_NAME = 'RatesService';
