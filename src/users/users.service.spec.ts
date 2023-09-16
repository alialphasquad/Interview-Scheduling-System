import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

let userData = {
  id: 1,
  email: 'ali@gmail.com',
  firstName: 'muhammad',
  lastName: 'ali',
  username: 'muhammadali',
  password: "1234"
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation(() => Promise.resolve(userData)),
            update: jest
              .fn()
              .mockImplementation(() => Promise.resolve(userData)),
            findOne: jest.fn().mockImplementation(() => Promise.resolve(userData)),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be find user', () => {
    expect(service.findOne(1)).resolves.toEqual(userData);
  });
  it('should be update user', () => {
    expect(service.update(1,userData)).resolves.toEqual(userData);
  });
  it('should be create user', () => {
    expect(service.create(userData)).resolves.toEqual(userData);
  });
});
