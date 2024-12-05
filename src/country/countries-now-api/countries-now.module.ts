import { Module } from '@nestjs/common';
import { CountriesNowService } from './countries-now.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [CountriesNowService],
  exports: [CountriesNowService],
})
export class CountriesNowModule {}
