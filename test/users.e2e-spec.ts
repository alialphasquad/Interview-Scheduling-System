import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersTestModule } from 'src/users/users.test.module';

let userData = {
    id: 1,
    email: 'ali@gmail.com',
    firstName: 'muhammad',
    lastName: 'ali',
    username: 'muhammadali',
    password: '1234',
  };

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersTestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST) - should create a new user', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(userData)
      .expect(201)
      .expect(userData);
  });

  it('/users (GET) - should get all users', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(userData);
  });

  it('/users/:id (GET) - should get one user by ID', () => {
    const userId = 1;
    return request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(200)
      .expect(userData);
  });
});
