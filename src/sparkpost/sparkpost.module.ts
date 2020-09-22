import { Module } from '@nestjs/common';
import { SparkpostController } from './controllers/sparkpost.controller';
import { DatabaseModule } from 'src/db/database.module';
import { SparkpostProviders } from './sparkpost.providers';
import { SparkpostService } from './services/sparkpost.service';
import { SparkpostRepository } from './repository/sparkpost.repository';
import { APP_FILTER } from '@nestjs/core';
import { MongoErrorFilter } from 'src/sparkpost/filters/mongo.filter';
import { ValidationErrorFilter } from 'src/sparkpost/filters/validation.filter';

@Module({
  imports: [DatabaseModule],
  controllers: [SparkpostController],
  providers: [
    SparkpostService,
    SparkpostRepository,
    ...SparkpostProviders,
    {
      provide: APP_FILTER,
      useClass: MongoErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationErrorFilter,
    },
  ],
})
export class SparkpostModule {}
