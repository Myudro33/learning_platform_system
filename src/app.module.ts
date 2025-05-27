import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { LectureModule } from './lecture/lecture.module';
import { AssignmentModule } from './assignment/assignment.module';
import { MailModule } from './mailer/mailer.module';
import { UploadModule } from './file-upload/file-upload.module';
import { FileModule } from './file/file.module';
import { SubmissionModule } from './submission/submission.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    CourseModule,
    LectureModule,
    AssignmentModule,
    MailModule,
    UploadModule,
    FileModule,
    SubmissionModule,
  ],
  providers: [UserService],
})
export class AppModule {}
