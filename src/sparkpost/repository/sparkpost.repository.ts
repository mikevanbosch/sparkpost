import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { SparkpostDocument } from './sparkpost.document';
import { Sparkpost } from '../interfaces/Sparkpost';

@Injectable()
export class SparkpostRepository {
  constructor(
    @Inject('SPARKPOST_MODEL')
    private sparkpostModel: Model<SparkpostDocument>,
  ) {}

  async create(sparkpostDto: Sparkpost): Promise<SparkpostDocument> {
    return new this.sparkpostModel(sparkpostDto).save();
  }

  async findByName(name: string): Promise<SparkpostDocument> {
    return this.sparkpostModel.findOne({ name }).exec();
  }

  async updateAge(sparkpostDto: Sparkpost): Promise<SparkpostDocument> {
    return this.sparkpostModel.update(
      { name: sparkpostDto.name },
      {
        age: sparkpostDto.age,
      },
      { runValidators: true },
    );
  }
}
