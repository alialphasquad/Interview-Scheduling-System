import { Test, TestingModule } from '@nestjs/testing';
import { CandidatesService } from './candidates.service';

let candidateData = {
  id: 1,
  email: 'ali@gmail.com',
  username: 'muhammadali'
};

describe('CandidatesService', () => {
  let service: CandidatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CandidatesService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation(() => Promise.resolve(candidateData)),
            update: jest
              .fn()
              .mockImplementation(() => Promise.resolve(candidateData)),
            findOne: jest.fn().mockImplementation(() => Promise.resolve(candidateData)),
          },
        },
      ],
    }).compile();

    service = module.get<CandidatesService>(CandidatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be find candidate', () => {
    expect(service.findOne(1)).resolves.toEqual(candidateData);
  });
  it('should be update candidate', () => {
    expect(service.update(1,candidateData)).resolves.toEqual(candidateData);
  });
  it('should be create candidate', () => {
    expect(service.create(candidateData)).resolves.toEqual(candidateData);
  });
});
