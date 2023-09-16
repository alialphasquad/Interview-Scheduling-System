import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

let userData = {
  id: 1,
  email: 'ali@gmail.com',
  firstName: 'muhammad',
  lastName: 'ali',
  username: 'muhammadali',
  password: '1234',
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(userData),
            update: jest
              .fn()
              .mockImplementation(() => Promise.resolve(userData)),
            delete: jest
              .fn()
              .mockResolvedValue(() => Promise.resolve(userData)),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be findAll users', async () => {
    await expect(controller.findAll()).resolves.toEqual(userData);
  });
  it('should be update user', async () => {
    await expect(controller.update(2, userData)).resolves.toEqual(
      userData,
    );
  });
  it('should be delete user', async () => {
    let tem = controller
      .remove(1)
      .then((res) => console.log('responce is ', res));
    await expect(controller.remove(1)).resolves.toEqual(
      'User Deleted!',
    );
  });
});
