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
  async create(@Body() sparkpostDto: Sparkpost) {
    await this.sparkpostService.create(sparkpostDto);
  }

  @Get(':name')
  async findOne(@Param('name') name): Promise<Sparkpost> {
    const sparkpost = await this.sparkpostService.findByName(name);
    if (!sparkpost) {
      throw new NotFoundException();
    }

    return sparkpost;
  }

  @Put()
  @HttpCode(204)
  @UseFilters(new MongoErrorFilter(), new ValidationErrorFilter())
  async update(@Body() sparkpostDto: Sparkpost): Promise<void> {
    const sparkpost = await this.sparkpostService.updateAge(sparkpostDto);
    if (!sparkpost) {
      throw new BadRequestException();
    }
  }
}
