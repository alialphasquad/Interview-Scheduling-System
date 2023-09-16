import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';

let bookingData = {
  id: 1,
  slotId:1,
  candidateId:1
};

describe('BookingsService', () => {
  let service: BookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BookingsService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation(() => Promise.resolve(bookingData)),
            update: jest
              .fn()
              .mockImplementation(() => Promise.resolve(bookingData)),
            findOne: jest.fn().mockImplementation(() => Promise.resolve(bookingData)),
          },
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be find Booking', () => {
    expect(service.findOne(1,1)).resolves.toEqual(bookingData);
  });
  it('should be update Booking', () => {
    expect(service.update(1,1,bookingData)).resolves.toEqual(bookingData);
  });
  it('should be create Booking', () => {
    expect(service.create(bookingData)).resolves.toEqual(bookingData);
  });
});
