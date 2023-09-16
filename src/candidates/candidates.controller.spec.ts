import { Test, TestingModule } from '@nestjs/testing';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';

let candidateData = {
  id: 1,
  email: 'ali@gmail.com',
  username: 'muhammadali'
};

describe('CandidatesController', () => {
  let controller: CandidatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidatesController],
      providers: [
        {
          provide: CandidatesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(candidateData),
            update: jest
              .fn()
              .mockImplementation(() => Promise.resolve(candidateData)),
            delete: jest
              .fn()
              .mockResolvedValue(() => Promise.resolve(candidateData)),
          },
        },
      ],
    }).compile();

    controller = module.get<CandidatesController>(CandidatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be findAll candidatets', async () => {
    await expect(controller.findAll()).resolves.toEqual(candidateData);
  });
  it('should be update candidate', async () => {
    await expect(controller.update(2, candidateData)).resolves.toEqual(
      candidateData,
    );
  });
  it('should be delete candidate', async () => {
    let tem = controller
      .remove(1)
      .then((res) => console.log('responce is ', res));
    await expect(controller.remove(1)).resolves.toEqual(
      'User Deleted!',
    );
})
})

