import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { AdminGuard, JwtGuard } from '../auth/guard';
import { InstructorGuard } from '../auth/guard/instructor.guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { StudentGuard } from '../auth/guard/student.guard';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @UseGuards(JwtGuard, AdminGuard, InstructorGuard)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }
  @Get()
  getCourses() {
    return this.courseService.getCourses();
  }
  @UseGuards(JwtGuard, StudentGuard)
  @Post('/:id/enroll')
  enrollCourse(@Param('id') id: string, @GetUser() user: User) {
    return this.courseService.enrollCourse(+id, user.id);
  }
  @Get('/:id')
  getCourseById(@Param('id') id: string) {
    return this.courseService.getCourseById(+id);
  }
}
