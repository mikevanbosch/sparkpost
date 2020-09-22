import { SparkpostService } from './sparkpost.service';
import { SparkpostRepository } from '../repository/sparkpost.repository';

describe('SparkpostService', () => {
  let sparkpostService: SparkpostService;
  let sparkpostRepository: SparkpostRepository;

  beforeEach(async () => {
    sparkpostRepository = new SparkpostRepository(undefined);
    sparkpostService = new SparkpostService(sparkpostRepository);
  });

  describe('create', () => {
    it('should call the sparkpost repository with the correct data', async () => {
      const expectedSparkPost = { name: 'Michael', age: 25 };
      const sparkpostRepositorySpy = jest
        .spyOn(sparkpostRepository, 'create')
        .mockImplementation(jest.fn());
      await sparkpostService.create(expectedSparkPost);

      expect(sparkpostRepositorySpy).toHaveBeenCalledTimes(1);
      expect(sparkpostRepositorySpy).toHaveBeenCalledWith(expectedSparkPost);
    });
  });

  describe('findByName', () => {
    it('should call the sparkpost repository', async () => {
      const expectedName = 'some name';
      const mockSparkpost: any = {};
      const sparkpostRepositorySpy = jest
        .spyOn(sparkpostRepository, 'findByName')
        .mockResolvedValue(mockSparkpost);
      await sparkpostService.findByName(expectedName);

      expect(sparkpostRepositorySpy).toHaveBeenCalledTimes(1);
      expect(sparkpostRepositorySpy).toHaveBeenCalledWith(expectedName);
    });

    it('should return a sparkpost', async () => {
      const expectedSparkpost = { name: 'michael', age: 25 };
      const sparkpostDocument: any = { _id: 123, ...expectedSparkpost };
      jest
        .spyOn(sparkpostRepository, 'findByName')
        .mockResolvedValue(sparkpostDocument);
      const sparkpost = await sparkpostService.findByName(
        expectedSparkpost.name,
      );

      expect(sparkpost).toEqual(expectedSparkpost);
    });

    it('should return undefined if a sparkpost does not exist', async () => {
      jest
        .spyOn(sparkpostRepository, 'findByName')
        .mockResolvedValue(undefined);
      const sparkpost = await sparkpostService.findByName('some name');

      expect(sparkpost).toEqual(undefined);
    });
  });

  describe('updateAge', () => {
    it('should call the sparkpost repository', async () => {
      const expectedSparkPost = { name: 'Michael', age: 25 };
      const sparkpostDocument: any = { _id: 123, ...expectedSparkPost };

      const sparkpostRepositoryFindSpy = jest
        .spyOn(sparkpostRepository, 'findByName')
        .mockResolvedValue(sparkpostDocument);
      const sparkpostRepositoryUpdateSpy = jest
        .spyOn(sparkpostRepository, 'updateAge')
        .mockImplementation(jest.fn());

      await sparkpostService.updateAge(expectedSparkPost);

      expect(sparkpostRepositoryFindSpy).toHaveBeenCalledTimes(1);
      expect(sparkpostRepositoryUpdateSpy).toHaveBeenCalledTimes(1);
      expect(sparkpostRepositoryFindSpy).toHaveBeenCalledWith(
        expectedSparkPost.name,
      );
      expect(sparkpostRepositoryUpdateSpy).toHaveBeenCalledWith(
        expectedSparkPost,
      );
    });

    it('should return sparkpost', async () => {
      const expectedSparkpost = { name: 'michael', age: 25 };
      const sparkpostDocument: any = { _id: 123, ...expectedSparkpost };
      jest
        .spyOn(sparkpostRepository, 'findByName')
        .mockResolvedValue(sparkpostDocument);
      jest
        .spyOn(sparkpostRepository, 'updateAge')
        .mockImplementation(jest.fn());
      const sparkpost = await sparkpostService.updateAge(expectedSparkpost);

      expect(sparkpost).toEqual(sparkpostDocument);
    });

    it('should return undefined if sparkpost cant be found', async () => {
      const expectedSparkpost = { name: 'michael', age: 25 };
      jest
        .spyOn(sparkpostRepository, 'findByName')
        .mockResolvedValue(undefined);
      jest
        .spyOn(sparkpostRepository, 'updateAge')
        .mockImplementation(jest.fn());
      const sparkpost = await sparkpostService.updateAge(expectedSparkpost);

      expect(sparkpost).toEqual(undefined);
    });
  });
});
