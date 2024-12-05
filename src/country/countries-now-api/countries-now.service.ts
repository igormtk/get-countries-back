import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class CountriesNowService {
  private readonly countriesNowUrl: string;

  constructor(private configService: ConfigService) {
    this.countriesNowUrl = this.configService.get<string>(
      'BASE_URL_COUNTRY_NOW_API',
    );
  }
  // Get population data
  async getPopulationData(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.countriesNowUrl}/population`);
      return response.data.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data ||
          'Failed to fetch population data from CountriesNow API',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Get flag data
  async getFlagData(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.countriesNowUrl}/flag/images`);
      return response.data.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data ||
          'Failed to fetch flag data from CountriesNow API',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
