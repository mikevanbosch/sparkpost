import { Injectable } from '@nestjs/common';
import { SparkpostRepository } from '../repository/sparkpost.repository';
import { Sparkpost } from '../interfaces/Sparkpost';

@Injectable()
export class SparkpostService {
  constructor(private readonly sparkpostRepository: SparkpostRepository) {}

  async create(sparkpostDto: Sparkpost): Promise<Sparkpost> {
    return this.sparkpostRepository.create(sparkpostDto);
  }

  async findByName(findName: string): Promise<Sparkpost> {
    const sparkpost = await this.sparkpostRepository.findByName(findName);
    if (sparkpost) {
      const { name, age } = sparkpost;
      return { name, age };
    }
    return undefined;
  }

  async updateAge(sparkpostDto: Sparkpost): Promise<Sparkpost> {
    const sparkpost = await this.sparkpostRepository.findByName(sparkpostDto.name);
    if (!sparkpost) {
      return undefined;
    }
    await this.sparkpostRepository.updateAge(sparkpostDto);

    return sparkpost;
  }
}
