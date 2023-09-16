import { Test, TestingModule } from '@nestjs/testing';
import { InterviewsController } from './interviews.controller';
import { InterviewsService } from './interviews.service';

let interviewData = {
  id: 1,
  userId: 1,
  title: 'first',
  link: 'ztrruoi4s'
};

describe('InterviewsController', () => {
  let controller: InterviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterviewsController],
      providers: [
        {
          provide: InterviewsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(interviewData),
            update: jest
              .fn()
              .mockImplementation(() => Promise.resolve(interviewData)),
            delete: jest
              .fn()
              .mockResolvedValue(() => Promise.resolve(interviewData)),
          },
        },
      ],
    }).compile();

    controller = module.get<InterviewsController>(InterviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be findAll interviews', async () => {
    await expect(controller.findAll()).resolves.toEqual(interviewData);
  });
  it('should be update interview', async () => {
    await expect(controller.update(2, interviewData)).resolves.toEqual(
      interviewData,
    );
  });
  it('should be delete interview', async () => {
    let tem = controller
      .remove(1)
      .then((res) => console.log('responce is ', res));
    await expect(controller.remove(1)).resolves.toEqual(
      'interview Deleted!',
    );
  });
});
