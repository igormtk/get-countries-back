import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { NagerApiModule } from './nager-api/nager-api.module';
import { CountriesNowModule } from './countries-now-api/countries-now.module';

@Module({
  imports: [NagerApiModule, CountriesNowModule],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
