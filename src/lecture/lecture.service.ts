import { Injectable } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LectureService {
  constructor(private prisma: PrismaService) {}
  async create(id: number, data: CreateLectureDto) {
    try {
      const lecture = await this.prisma.lecture.create({
        data: {
          ...data,
          courseId: id,
        },
      });
      return { data: lecture, message: 'lecture created' };
    } catch (error) {
      return error;
    }
  }
  async getLectures(id: number) {
    try {
      const lectures = await this.prisma.lecture.findMany({
        where: { courseId: id },
        include: { attachments: true },
      });
      return { data: lectures, message: 'lectures fetched' };
    } catch (error) {
      return error;
    }
  }
}
