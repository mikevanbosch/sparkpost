import { Test } from '@nestjs/testing';
import { ValidationErrorFilter } from './validation.filter';

describe('ValidationErrorFilter', () => {
  let validationErrorFilter: ValidationErrorFilter;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ValidationErrorFilter],
    }).compile();
    validationErrorFilter = moduleRef.get<ValidationErrorFilter>(
      ValidationErrorFilter,
    );
  });

  it('should be defined', () => {
    expect(validationErrorFilter).toBeDefined();
  });
});
