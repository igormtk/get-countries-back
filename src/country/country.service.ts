import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { NagerApiService } from './nager-api/nager-api.service';
import { CountriesNowService } from './countries-now-api/countries-now.service';
import { CountryInfoDto } from './dto/country-info.dto';

@Injectable()
export class CountryService {
  constructor(
    private readonly nagerApiService: NagerApiService,
    private readonly countriesNowService: CountriesNowService,
  ) {}

  // Gets all available countries from Nager API
  async getAvailableCountries() {
    return await this.nagerApiService.getAvailableCountries();
  }

  // Gets country information like population, flag and border countries
  async getCountryInfo(countryCode: string): Promise<CountryInfoDto> {
    // Format country code to upperCase to send to Nager API, because there is no country code with 3 digits in the response
    const formattedCode = countryCode.toUpperCase().slice(0, 2);

    try {
      // Get border countries, population data and flag data
      const [borders, populationData, flagData] = await Promise.all([
        this.nagerApiService.getBorderCountries(formattedCode),
        this.countriesNowService.getPopulationData(),
        this.countriesNowService.getFlagData(),
      ]);

      // Finds the population and flag from the 2 first digits of the iso3 (some countries have iso3 with 3 digits, that's why we compare with the countryCode param)
      const population = populationData.find(
        (country) => country.iso3 === countryCode,
      );

      const flag = flagData.find((country) => country.iso3 === countryCode);

      const flagReturn = flag ? flag.flag : 'Flag data not found';

      const populationReturn = population
        ? population.populationCounts
        : 'Population data not found';

      return new CountryInfoDto(
        borders.countryName,
        borders.borders,
        populationReturn,
        flagReturn,
      );
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to fetch country info',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}