import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubmissionService {
  constructor(private prisma: PrismaService) {}
  async create(data) {
    try {
      const submission = await this.prisma.submission.create({ data });
      return { data: submission, message: 'submission created successfully' };
    } catch (error) {
      throw error;
    }
  }
}
