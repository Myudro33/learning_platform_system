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
          dueDate: dto.dueDate,
          courseId: id,
          title: dto.title,
          description: dto.description,
        },
      });
      return { assignment, message: 'assignment created' };
    } catch (error) {
      console.log('test');

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
}
