import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSubmissionDto } from './dto/submission-update.dto';
import { User } from '@prisma/client';
import { FileUploadService } from '../file-upload/file-upload.service';

@Injectable()
export class SubmissionService {
  constructor(
    private prisma: PrismaService,
    private uploadService: FileUploadService,
  ) {}
  async setGrade(body: UpdateSubmissionDto, id: number) {
    try {
      const submission = await this.prisma.submission.update({
        where: { id },
        data: { grade: body.grade },
      });
      return { data: submission, message: 'grade updated' };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Submission not found');
      }
      throw error.code;
    }
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
