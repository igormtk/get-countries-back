import { Module } from '@nestjs/common';
import { NagerApiService } from './nager-api.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [NagerApiService],
  exports: [NagerApiService],
})
export class NagerApiModule {}
