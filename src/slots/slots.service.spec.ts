import { Test, TestingModule } from '@nestjs/testing';
import { SlotsService } from './slots.service';

let slotData = {
  id: 1,
  interviewId: 1,
  startTime: new Date(),
  endTime: new Date(),
  isBooked: true
};

describe('SlotsService', () => {
  let service: SlotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SlotsService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation(() => Promise.resolve(slotData)),
            update: jest
              .fn()
              .mockImplementation(() => Promise.resolve(slotData)),
            findOne: jest.fn().mockImplementation(() => Promise.resolve(slotData)),
          },
        },
      ],
    }).compile();

    service = module.get<SlotsService>(SlotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be find slot', () => {
    expect(service.findOne(1)).resolves.toEqual(slotData);
  });
  it('should be update slot', () => {
    expect(service.update(1,slotData)).resolves.toEqual(slotData);
  });
  it('should be create slot', () => {
    expect(service.create(slotData)).resolves.toEqual(slotData);
  });
});
