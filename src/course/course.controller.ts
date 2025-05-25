import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { AdminGuard, JwtGuard } from '../auth/guard';
import { InstructorGuard } from '../auth/guard/instructor.guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { StudentGuard } from '../auth/guard/student.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('courses')
@ApiTags('Courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @UseGuards(JwtGuard, AdminGuard, InstructorGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'create course' })
  @ApiResponse({ status: 201, description: 'course created success' })
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }
  @Get()
  @ApiOperation({ summary: 'get courses' })
  @ApiResponse({ status: 200, description: 'courses fetched success' })
  getCourses() {
    return this.courseService.getCourses();
  }
  @UseGuards(JwtGuard, StudentGuard)
  @Post('/:id/enroll')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'enroll course' })
  @ApiResponse({ status: 201, description: 'course enrolled' })
  enrollCourse(@Param('id') id: string, @GetUser() user: User) {
    return this.courseService.enrollCourse(+id, user.id);
  }
  @Get('/:id')
  @ApiOperation({ summary: 'get course by id' })
  @ApiResponse({ status: 200, description: 'course by id fetched' })
  getCourseById(@Param('id') id: string) {
    return this.courseService.getCourseById(+id);
  }
}
