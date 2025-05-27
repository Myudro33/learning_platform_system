import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { MailerService } from 'src/mailer/mailer.service';
import { SubmissionService } from 'src/submission/submission.service';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Module({
  controllers: [AssignmentController],
  providers: [
    AssignmentService,
    MailerService,
    SubmissionService,
    FileUploadService,
  ],
})
export class AssignmentModule {}
