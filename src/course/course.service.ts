import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateCourseDto) {
    try {
      const course = await this.prisma.course.create({ data });
      return { data: course, message: 'Course created' };
    } catch (error) {
      return error;
    }
  }
}
