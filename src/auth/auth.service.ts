import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { SingInDto } from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async signUp(data: CreateAuthDto) {
    const hash = await bcrypt.hash(data.password, 10);
    try {
      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: hash,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
        throw new InternalServerErrorException(error);
      }
    }
  }
  async signIn(data: SingInDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: data.email },
      });
      if (!user) {
        throw new ForbiddenException('user not found');
      }
      const pwMatches = await bcrypt.compare(user.password, data.password);
      if (!pwMatches) {
        throw new ForbiddenException('incorect password');
      }
      return this.signToken(user.id, user.email, user.roleId);
    } catch (error) {
      return error;
    }
  }
  async signToken(
    userId: number,
    email: string,
    role: number,
  ): Promise<{ access_token: string }> {
    const payload = {
      id: userId,
      email,
      role,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: process.env.JWT_SECRET,
    });
    return {
      access_token: token,
    };
  }
}
