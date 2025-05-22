import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { AdminGuard, JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }
}
