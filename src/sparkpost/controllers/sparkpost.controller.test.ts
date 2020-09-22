import { SparkpostController } from './sparkpost.controller';
import { SparkpostService } from '../services/sparkpost.service';
import { Sparkpost } from '../interfaces/Sparkpost';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('SparkpostController', () => {
  let sparkpostController: SparkpostController;
  let sparkpostService: SparkpostService;

  beforeEach(async () => {
    sparkpostService = new SparkpostService(undefined);
    sparkpostController = new SparkpostController(sparkpostService);
  });

  describe('create', () => {
    it('should call sparkpost service', async () => {
      const expectedSparkpost: Sparkpost = { name: 'michael', age: 25 };
      const sparkpostServiceSpy = jest
        .spyOn(sparkpostService, 'create')
        .mockImplementation(jest.fn());

      await sparkpostController.create(expectedSparkpost);

      expect(sparkpostServiceSpy).toHaveBeenCalledTimes(1);
      expect(sparkpostServiceSpy).toHaveBeenCalledWith(expectedSparkpost);
    });
  });

  describe('findByName', () => {
    it('should call sparkpost service', async () => {
      const expectedSparkpost: Sparkpost = { name: 'michael', age: 25 };
      const sparkpostServiceSpy = jest
        .spyOn(sparkpostService, 'findByName')
        .mockResolvedValue(expectedSparkpost);

      await sparkpostController.findOne('some name');

      expect(sparkpostServiceSpy).toHaveBeenCalledTimes(1);
    });

    it('should return a sparkpost', async () => {
      const expectedSparkpost: Sparkpost = { name: 'michael', age: 25 };
      jest
        .spyOn(sparkpostService, 'findByName')
        .mockResolvedValue(expectedSparkpost);

      expect(await sparkpostController.findOne(expectedSparkpost.name)).toEqual(
        expectedSparkpost,
      );
    });

    it('should throw NotFoundException when findOne returns undefined', async () => {
      jest.spyOn(sparkpostService, 'findByName').mockResolvedValue(undefined);
      await expect(sparkpostController.findOne('nothing')).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('updateAge', () => {
    it('should call sparkpost service', async () => {
      const expectedSparkpost: Sparkpost = { name: 'michael', age: 25 };
      const sparkpostServiceSpy = jest
        .spyOn(sparkpostService, 'updateAge')
        .mockResolvedValue(expectedSparkpost);

      await sparkpostController.update(expectedSparkpost);

      expect(sparkpostServiceSpy).toHaveBeenCalledTimes(1);
      expect(sparkpostServiceSpy).toHaveBeenCalledWith(expectedSparkpost);
    });

    it('should throw NotFoundException when cannot find the sparkpost to update', async () => {
      const expectedSparkpost: Sparkpost = { name: 'michael', age: 25 };

      jest.spyOn(sparkpostService, 'updateAge').mockResolvedValue(undefined);
      await expect(
        sparkpostController.update(expectedSparkpost),
      ).rejects.toThrowError(BadRequestException);
    });
  });
});
