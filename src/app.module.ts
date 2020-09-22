import { Module } from '@nestjs/common';
import { SparkpostModule } from './sparkpost/sparkpost.module';

@Module({
  imports: [SparkpostModule],
})
export class AppModule {}
