import { Test, TestingModule } from '@nestjs/testing';
import { InterviewsService } from './interviews.service';

let interviewData = {
  id: 1,
  userId: 1,
  title: 'first',
  link: 'ztrruoi4s'
};

describe('InterviewsService', () => {
  let service: InterviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: InterviewsService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation(() => Promise.resolve(interviewData)),
            update: jest
              .fn()
              .mockImplementation(() => Promise.resolve(interviewData)),
            findOne: jest.fn().mockImplementation(() => Promise.resolve(interviewData)),
          },
        },
      ],
    }).compile();

    service = module.get<InterviewsService>(InterviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be find interview', () => {
    expect(service.findOne(1)).resolves.toEqual(interviewData);
  });
  it('should be update interview', () => {
    expect(service.update(1,interviewData)).resolves.toEqual(interviewData);
  });
  it('should be create interview', () => {
    expect(service.create(interviewData)).resolves.toEqual(interviewData);
  });
});
