import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  controllers: [AssignmentController],
  providers: [AssignmentService, MailerService],
})
export class AssignmentModule {}
