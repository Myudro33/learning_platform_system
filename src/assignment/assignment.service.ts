import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Injectable()
export class AssignmentService {
  constructor(private prisma: PrismaService) {}
  async createAssignment(id: number, dto: CreateAssignmentDto) {
    try {
      const assignment = await this.prisma.assignment.create({
        data: {
          ...dto,
          courseId: id,
          done: false,
        },
      });
      return { assignment, message: 'assignment created' };
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : JSON.stringify(error),
      );
    }
  }
  async getAssignments(id: number) {
    try {
      const assignments = await this.prisma.assignment.findMany({
        where: {
          courseId: id,
        },
        include: {
          course: {
            select: {
              title: true,
              description: true,
              students: {
                select: { id: true, name: true, email: true, avatar: true },
              },
            },
          },
        },
      });
      return { assignments, message: 'assignments fetched' };
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : JSON.stringify(error),
      );
    }
  }
  async submit(id: number) {
    try {
      const assignment = await this.prisma.assignment.update({
        where: { id },
        data: { done: true },
      });
      return { data: assignment, message: 'assignment done!' };
    } catch (error) {
      return error;
    }
  }
  async getSubmitedSubmissions(id: number) {
    try {
      const assignments = await this.prisma.assignment.findMany({
        where: { courseId: id, done: true },
      });
      return { data: assignments, message: 'assignments fetched' };
    } catch (error) {}
  }
}
