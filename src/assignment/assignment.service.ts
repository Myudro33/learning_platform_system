import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { MailerService } from '../mailer/mailer.service';
import { User } from '@prisma/client';
import { SubmissionService } from 'src/submission/submission.service';

@Injectable()
export class AssignmentService {
  constructor(
    private prisma: PrismaService,
    private emailService: MailerService,
    private submissionService: SubmissionService,
  ) {}
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
  async submit(id: number, file: Express.Multer.File, user: User) {
    try {
      const assignment = await this.prisma.assignment.update({
        where: { id },
        data: { done: true },
        include: { course: true },
      });
      const author = await this.prisma.user.findUnique({
        where: { id: assignment.course.createdBy },
      });
      if (author && author.email) {
        await this.emailService.sendMail(
          author.email,
          'Task assigned',
          `<h1>student submited assignment</h1>
          <h2 style="color: #4CAF50; font-size: 20px; letter-spacing: 5px;">Assignment details: ${assignment.title}</h2>
            <p>Task details: ${assignment.description ? assignment.description : "assignment doesn't have description"}</p>
            <p>Deadline: ${assignment.dueDate}</p>`,
        );
      } else {
        return { message: 'author not found' };
      }
      return this.submissionService.CreateSubmissionDto(id, file, user);
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
