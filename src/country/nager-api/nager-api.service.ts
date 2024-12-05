import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class NagerApiService {
  private readonly nagerApiUrl: string;

  constructor(private configService: ConfigService) {
    this.nagerApiUrl = this.configService.get<string>('BASE_URL_NAGER_API');
  }

  // Get all available countries from Nager API
  async getAvailableCountries(): Promise<string[]> {
    try {
      const response = await axios.get(
        `${this.nagerApiUrl}/AvailableCountries`,
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data ||
          'Failed to fetch available countries from Nager API',
        error.response?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Get border countries from Nager API
  async getBorderCountries(
    countryCode: string,
  ): Promise<{ borders: string[]; countryName: string }> {
    try {
      const response = await axios.get(
        `${this.nagerApiUrl}/CountryInfo/${countryCode}`,
      );
      const data = response.data;

      const borders = data.borders || [];
      const countryName = data.officialName || '';

      return {
        borders,
        countryName,
      };
    } catch (error) {
      throw new HttpException(
        error.response?.data ||
          'Failed to fetch border countries from Nager API',
        error.response?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
