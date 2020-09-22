import { MongoErrorFilter } from './mongo.filter';
import { Test } from '@nestjs/testing';

describe('MongoErrorFilter', () => {
  let mongoErrorFilter: MongoErrorFilter;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [MongoErrorFilter],
    }).compile();
    mongoErrorFilter = moduleRef.get<MongoErrorFilter>(MongoErrorFilter);
  });

  it('should be defined', () => {
    expect(mongoErrorFilter).toBeDefined();
  });
});
