import { Injectable } from '@nestjs/common';
import { SparkpostRepository } from '../repository/sparkpost.repository';
import { Sparkpost } from '../interfaces/Sparkpost';

@Injectable()
export class SparkpostService {
  constructor(private readonly sparkpostRepository: SparkpostRepository) {}

  async create(sparkpost: Sparkpost): Promise<Sparkpost> {
    return this.sparkpostRepository.create(sparkpost);
  }

  async findByName(findName: string): Promise<Sparkpost> {
    const sparkpost = await this.sparkpostRepository.findByName(findName);
    if (sparkpost) {
      const { name, age } = sparkpost;
      return { name, age };
    }
    return undefined;
  }

  async updateAge(sparkpost: Sparkpost): Promise<Sparkpost> {
    const returnedSparkpost = await this.sparkpostRepository.findByName(
      sparkpost.name,
    );
    if (!returnedSparkpost) {
      return undefined;
    }
    await this.sparkpostRepository.updateAge(sparkpost);

    return returnedSparkpost;
  }
}
