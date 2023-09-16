import { Test, TestingModule } from '@nestjs/testing';
import { SlotsController } from './slots.controller';
import { SlotsService } from './slots.service';

let slotData = {
  id: 1,
  interviewId: 1,
  startTime: new Date(),
  endTime: new Date(),
  isBooked: true
};

describe('SlotsController', () => {
  let controller: SlotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlotsController],
      providers: [
        {
          provide: SlotsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(slotData),
            update: jest
              .fn()
              .mockImplementation(() => Promise.resolve(slotData)),
            delete: jest
              .fn()
              .mockResolvedValue(() => Promise.resolve(slotData)),
          },
        },
      ],
    }).compile();

    controller = module.get<SlotsController>(SlotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be findAll slots', async () => {
    await expect(controller.findAll()).resolves.toEqual(slotData);
  });
  it('should be update slot', async () => {
    await expect(controller.update(2, slotData)).resolves.toEqual(
      slotData,
    );
  });
  it('should be delete slot', async () => {
    let tem = controller
      .remove(1)
      .then((res) => console.log('responce is ', res));
    await expect(controller.remove(1)).resolves.toEqual(
      'slot Deleted!',
    );
  });
});
