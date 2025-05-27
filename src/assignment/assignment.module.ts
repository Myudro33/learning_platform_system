import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { MailerService } from 'src/mailer/mailer.service';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { SubmissionService } from 'src/submission/submission.service';

@Module({
  controllers: [AssignmentController],
  providers: [
    AssignmentService,
    MailerService,
    FileUploadService,
    SubmissionService,
  ],
})
export class AssignmentModule {}
