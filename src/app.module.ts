import { Module } from '@nestjs/common';
import { CountryModule } from './country/country.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), CountryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
