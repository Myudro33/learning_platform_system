import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileUploadService } from '../file-upload/file-upload.service';

@Module({
  controllers: [FileController],
  providers: [FileService, FileUploadService],
})
export class FileModule {}
