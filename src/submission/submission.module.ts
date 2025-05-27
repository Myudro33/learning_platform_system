import { Module } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { FileUploadService } from '../file-upload/file-upload.service';

@Module({
  controllers: [SubmissionController],
  providers: [SubmissionService, FileUploadService],
  exports: [SubmissionService],
})
export class SubmissionModule {}
