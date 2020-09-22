import {
  Controller,
  Get,
  Post,
  Body,
  UseFilters,
  Param,
  NotFoundException,
  Put,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { SparkpostService } from '../services/sparkpost.service';
import { Sparkpost } from '../interfaces/Sparkpost';
import { ValidationErrorFilter } from '../filters/validation.filter';
import { MongoErrorFilter } from '../filters/mongo.filter';

@Controller('sparkpost')
export class SparkpostController {
  constructor(private readonly sparkpostService: SparkpostService) {}

  @Post()
  @UseFilters(new MongoErrorFilter(), new ValidationErrorFilter())
  async create(@Body() sparkpost: Sparkpost): Promise<void> {
    await this.sparkpostService.create(sparkpost);
  }

  @Get(':name')
  async findOne(@Param('name') name: string): Promise<Sparkpost> {
    const sparkpost = await this.sparkpostService.findByName(name);
    if (!sparkpost) {
      throw new NotFoundException();
    }

    return sparkpost;
  }

  @Put()
  @HttpCode(204)
  @UseFilters(new MongoErrorFilter(), new ValidationErrorFilter())
  async update(@Body() sparkpost: Sparkpost): Promise<void> {
    const returnedSparkpost = await this.sparkpostService.updateAge(sparkpost);
    if (!returnedSparkpost) {
      throw new BadRequestException();
    }
  }
}
