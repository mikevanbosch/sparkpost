import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { SparkpostModule } from '../sparkpost.module';
import { SparkpostRepository } from './sparkpost.repository';

describe('SparkpostRepository', () => {
  let app: INestApplication;
  let mongoServer;
  let sparkpostRepository: SparkpostRepository;

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();

    mongoose.connect(mongoUri);
    const moduleRef = await Test.createTestingModule({
      imports: [SparkpostModule],
    })
      .overrideProvider('DATABASE_CONNECTION')
      .useFactory({
        factory: async (): Promise<typeof mongoose> =>
          await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
          }),
      })
      .compile();
    sparkpostRepository = moduleRef.get<SparkpostRepository>(
      SparkpostRepository,
    );
    app = moduleRef.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    await app.close();
  });

  it('should create a sparkpost', async () => {
    const expectedSparkpost = { name: 'michael', age: 25 };
    await sparkpostRepository.create(expectedSparkpost);
    const { name, age } = await sparkpostRepository.findByName(
      expectedSparkpost.name,
    );

    expect(name).toEqual(expectedSparkpost.name);
    expect(age).toEqual(expectedSparkpost.age);
  });

  it('should update a sparkpost', async () => {
    const expectedSparkpost = { name: 'michael', age: 25 };
    await sparkpostRepository.create(expectedSparkpost);

    const updatedSparkpost = { name: expectedSparkpost.name, age: 26 };

    await sparkpostRepository.updateAge(updatedSparkpost);

    const { name, age } = await sparkpostRepository.findByName(
      updatedSparkpost.name,
    );

    expect(name).toEqual(expectedSparkpost.name);
    expect(age).toEqual(updatedSparkpost.age);
  });
});
