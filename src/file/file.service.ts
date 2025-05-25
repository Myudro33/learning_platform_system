import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadService } from '../file-upload/file-upload.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFileDto } from './dto/create-file.dto';
import { User } from '@prisma/client';

@Injectable()
export class FileService {
  constructor(
    private prisma: PrismaService,
    private uploadService: FileUploadService,
  ) {}
  async create(data: CreateFileDto, file: Express.Multer.File[], user: User) {
    try {
      const lecture = await this.prisma.lecture.findUnique({
        where: { id: parseInt(data.lectureId) },
      });
      if (!lecture) {
        throw new NotFoundException('lecture not found');
      }
      const files = Array.isArray(file) ? file : [file];
      const uploadedFiles: any = [];
      for (const f of files) {
        const fileUrl = this.uploadService.getPublicUrl(f.filename, 'files');
        const newFile = await this.prisma.file.create({
          data: {
            ...data,
            lectureId: parseInt(data.lectureId),
            uploadedBy: user.id,
            filename: f.filename,
            url: fileUrl,
          },
        });
        uploadedFiles.push(newFile);
      }
      return { data: uploadedFiles, message: 'file uploaded' };
    } catch (error) {
      throw error;
    }
  }
  async getFiles(id: number) {
    try {
      const files = await this.prisma.file.findMany({
        where: { lectureId: id },
      });
      return { data: files, message: 'files fetched success' };
    } catch (error) {
      throw error;
    }
  }
}
