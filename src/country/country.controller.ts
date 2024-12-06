import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('available')
  async getAvailableCountries() {
    try {
      const availableCountries =
        await this.countryService.getAvailableCountries();
      return { success: true, data: availableCountries };
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to fetch available countries',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':countryCode')
  async getCountryInfo(@Param('countryCode') countryCode: string) {
    // Validate ISO2 format (2 uppercase letters)
    if (!/^[A-Z]{2}$/.test(countryCode)) {
      throw new HttpException(
        'Invalid country code format. Use ISO2 format (2 uppercase letters).',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const countryInfo = await this.countryService.getCountryInfo(countryCode);
      return { success: true, data: countryInfo };
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to fetch country info',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
