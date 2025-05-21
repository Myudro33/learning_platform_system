import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getUsers() {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
