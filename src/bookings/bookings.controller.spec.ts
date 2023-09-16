import { Test, TestingModule } from '@nestjs/testing';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
let bookingData = {
  id: 1,
  slotId:1,
  candidateId:1
};
describe('BookingsController', () => {
  let controller: BookingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [
        {
          provide: BookingsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(bookingData),
            update: jest
              .fn()
              .mockImplementation(() => Promise.resolve(bookingData)),
            delete: jest
              .fn()
              .mockResolvedValue(() => Promise.resolve(bookingData)),
          },
        },
      ],
    }).compile();

    controller = module.get<BookingsController>(BookingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be findAll bookings', async () => {
    await expect(controller.findAll()).resolves.toEqual(bookingData);
  });
  it('should be update bookings', async () => {
    await expect(controller.update(1,1, bookingData)).resolves.toEqual(
      bookingData,
    );
  });
  it('should be delete bookings', async () => {
    let tem = controller
      .remove(1,1)
      .then((res) => console.log('responce is ', res));
    await expect(controller.remove(1,1)).resolves.toEqual(
      'Booking Deleted!',
    );
  });
});
