import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { MailerService } from '../mailer/mailer.service';
import { SubmissionService } from 'src/submission/submission.service';
import { User } from '@prisma/client';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class AssignmentService {
  constructor(
    private prisma: PrismaService,
    private emailService: MailerService,
    private submissionService: SubmissionService,
    private uploadService: FileUploadService,
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
      return this.CreateSubmissionDto(id, file, user);
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

  async CreateSubmissionDto(id: number, file: Express.Multer.File, user: User) {
    if (file) {
      const fileUrl = this.uploadService.getPublicUrl(file.filename, 'files');
      const submission = await this.prisma.submission.create({
        data: {
          file: fileUrl,
          assignmentId: id,
          studentId: user.id,
          submittedAt: new Date(),
          grade: null,
        },
      });
      return { data: submission, message: 'submission created' };
    } else {
      throw new InternalServerErrorException('file is required');
    }
  }
}
