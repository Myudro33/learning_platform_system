import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, CourseModule],
  providers: [UserService],
})
export class AppModule {}
