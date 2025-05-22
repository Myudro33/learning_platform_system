import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { AdminGuard, JwtGuard } from '../auth/guard';
import { InstructorGuard } from '../auth/guard/instructor.guard';

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
}
