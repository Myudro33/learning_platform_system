import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { CreateAuthDto } from 'src/auth/dto/create-user.dto';
import { CreateCourseDto } from 'src/course/dto/create-course.dto';

describe('app e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(3000);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    await prisma.role.createMany({
      data: [
        { id: 1, name: 'admin' },
        { id: 2, name: 'instructor' },
        { id: 3, name: 'student' },
      ],
    });
    pactum.request.setBaseUrl('http://localhost:3000');
  });
  afterAll(() => {
    app.close();
  });
  describe('Auth', () => {
    const dto: CreateAuthDto = {
      name: 'test',
      email: 'test@gmail.com',
      password: '123',
      roleId: 1,
      avatar: '',
    };
    describe('signup', () => {
      it('should throw error if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('should throw error if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.email })
          .expectStatus(400);
      });
      it('should throw error if no body', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('should signup', () => {
        return pactum.spec().post('/auth/signup').withBody(dto);
      });
    });
    describe('signin', () => {
      it('should throw error if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('should throw error if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: dto.email })
          .expectStatus(400);
      });
      it('should throw error if no body', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
      it('should throw error if incorect password', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: 'test@gmail.com', password: 'test' })
          .expectBodyContains(403);
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(201)
          .stores('userAt', 'access_token');
      });
    });
  });
  describe('User', () => {
    describe('profile', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });
    describe('users', () => {
      it('should return users(admin)', () => {
        return pactum
          .spec()
          .get('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });
  });
  describe('Course', () => {
    const dto: CreateCourseDto = {
      createdBy: 1,
      description: 'test desc',
      title: 'test title',
    };
    describe('create', () => {
      it('should return error if empty body', () => {
        return pactum
          .spec()
          .post('/courses')
          .withBody({})
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(400);
      });
      it('should create course', () => {
        return pactum
          .spec()
          .post('/courses')
          .withBody(dto)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(201);
      });
    });
  });
});
