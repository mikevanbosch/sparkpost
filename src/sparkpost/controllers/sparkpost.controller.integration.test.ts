import { Test } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { SparkpostModule } from '../sparkpost.module';
import * as request from 'supertest';

describe('SparkpostRepository', () => {
  let app: INestApplication;
  let mongoServer;

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

  afterAll(async () => {
    await app.close();
  });

  describe('create', () => {
    it('should respond 201 when a sparkpost is created', async () => {
      return request(app.getHttpServer())
        .post('/sparkpost')
        .send({ name: 'michael', age: 25 })
        .expect(HttpStatus.CREATED);
    });

    it('should respond 400 when given bad data', async () => {
      return request(app.getHttpServer())
        .post('/sparkpost')
        .send({ name: '<script>bad data</script>', age: 25 })
        .expect(HttpStatus.BAD_REQUEST)
        .then(response => {
          expect(response.body.errors).toBeDefined();
        });
    });

    it('should validate age limit', async () => {
      const expectedSparkpost = { name: 'michael', age: 250 };
      return request(app.getHttpServer())
        .post('/sparkpost')
        .send(expectedSparkpost)
        .expect(HttpStatus.BAD_REQUEST)
        .then(response => {
          expect(response.body.errors).toBeDefined();
        });
    });

    it('should respond 409 conflict when name already exists', async () => {
      const sameSparkpost = { name: 'michael', age: 25 };
      await request(app.getHttpServer())
        .post('/sparkpost')
        .send(sameSparkpost)
        .expect(HttpStatus.CREATED);

      return request(app.getHttpServer())
        .post('/sparkpost')
        .send(sameSparkpost)
        .expect(HttpStatus.CONFLICT);
    });
  });

  describe('findByName', () => {
    it('should respond 404 not found when a sparkpost does not exist', async () => {
      return request(app.getHttpServer())
        .get('/sparkpost/michael')
        .expect(HttpStatus.NOT_FOUND);
    });

    it('should return a sparkpost when found', async () => {
      const expectedSparkpost = { name: 'michael', age: 25 };
      await request(app.getHttpServer())
        .post('/sparkpost')
        .send(expectedSparkpost)
        .expect(HttpStatus.CREATED);

      return request(app.getHttpServer())
        .get('/sparkpost/michael')
        .expect(HttpStatus.OK)
        .then(response => {
          expect(response.body).toEqual(expectedSparkpost);
        });
    });
  });

  describe('update', () => {
    it('should respond 400 when a sparkpost does not exist', async () => {
      const expectedSparkpost = { name: 'michael', age: 25 };
      return request(app.getHttpServer())
        .put('/sparkpost')
        .send(expectedSparkpost)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  it('should respond 204 when put successful', async () => {
    const expectedSparkpost = { name: 'michael', age: 25 };
    await request(app.getHttpServer())
      .post('/sparkpost')
      .send(expectedSparkpost)
      .expect(HttpStatus.CREATED);

    return request(app.getHttpServer())
      .put('/sparkpost')
      .send(expectedSparkpost)
      .expect(HttpStatus.NO_CONTENT);
  });

  it('should validate age limit', async () => {
    await request(app.getHttpServer())
      .post('/sparkpost')
      .send({ name: 'michael', age: 25 })
      .expect(HttpStatus.CREATED);

    return request(app.getHttpServer())
      .put('/sparkpost')
      .send({ name: 'michael', age: 250 })
      .expect(HttpStatus.BAD_REQUEST)
      .then(response => {
        expect(response.body.errors).toBeDefined();
      });
  });
});
