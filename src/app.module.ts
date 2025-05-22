import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { LectureModule } from './lecture/lecture.module';
import { AssignmentModule } from './assignment/assignment.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, CourseModule, LectureModule, AssignmentModule],
  providers: [UserService],
})
export class AppModule {}
