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

  async create(sparkpost: Sparkpost): Promise<SparkpostDocument> {
    return new this.sparkpostModel(sparkpost).save();
  }

  async findByName(name: string): Promise<SparkpostDocument> {
    return this.sparkpostModel.findOne({ name }).exec();
  }

  async updateAge(sparkpost: Sparkpost): Promise<SparkpostDocument> {
    return this.sparkpostModel.update(
      { name: sparkpost.name },
      {
        age: sparkpost.age,
      },
      { runValidators: true },
    );
  }
}
