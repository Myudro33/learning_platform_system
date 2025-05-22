import { Injectable, NotFoundException } from '@nestjs/common';
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
  async getCourses() {
    try {
      const courses = await this.prisma.course.findMany({
        include: {
          students: {
            select: { id: true, name: true, email: true, avatar: true },
          },
        },
      });
      return { data: courses, message: 'courses fetched' };
    } catch (error) {
      return error;
    }
  }
  async enrollCourse(courseId: number, userId: number) {
    try {
      const course = await this.prisma.course.update({
        where: { id: courseId },
        data: {
          students: {
            connect: { id: userId },
          },
        },
        select: {
          students: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
      return { data: course, message: 'Course enrolled' };
    } catch (error) {
      return error;
    }
  }
  async getCourseById(id: number) {
    try {
      const course = await this.prisma.course.findUnique({
        where: { id },
        include: {
          students: {
            select: { id: true, name: true, email: true, avatar: true },
          },
        },
      });
      if (!course) {
        return new NotFoundException('course not found');
      }
      return { data: course, message: 'course fetched' };
    } catch (error) {
      return error;
    }
  }
}
