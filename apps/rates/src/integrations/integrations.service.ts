import { Injectable } from '@nestjs/common';

@Injectable()
export class IntegrationsService {
  async getRates(currencyCode: string) {
    console.log(currencyCode);
    const apiUrl = `https://v6.exchangerate-api.com/v6/fd8afa3bfd2ef394f1f8b20e/latest/${currencyCode}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        return { result: 'fail', message: 'Network response was not ok' };
      }

      const data = await response.json();
      data.terms_of_use = undefined;
      data.time_last_update_unix = undefined;
      data.time_next_update_unix = undefined;
      data.documentation = undefined;
      return data;
    } catch (error) {
      return {
        result: 'fail',
        message: 'There was a problem with the fetch operation',
      };
    }
  }
}
