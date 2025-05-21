import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { CreateAuthDto } from 'src/auth/dto/create-user.dto';

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
      roleId: 2,
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
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    // describe('signin',()=>{
    //   it('should throw error if email is empty',()=>{
    //     return pactum.spec().post('/auth/signin').withBody({password:dto.password}).expectStatus(400)
    //   })
    //   it('should throw error if password is empty',()=>{
    //     return pactum.spec().post('/auth/signin').withBody({password:dto.email}).expectStatus(400)
    //   })
    //   it('should throw error if no body',()=>{
    //     return pactum.spec().post('/auth/signin').expectStatus(400)
    //   })
    //   it('should signin',()=>{
    //     return pactum.spec().post('/auth/signin').withBody(dto).expectStatus(201).stores('userAt','access_token')
    //   })

    // })
  });
});
