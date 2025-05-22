import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { JwtGuard } from '../auth/guard';
import { InstructorGuard } from '../auth/guard/instructor.guard';

@Controller('courses')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}
  @UseGuards(JwtGuard, InstructorGuard)
  @Post('/:id/lectures')
  create(@Param('id') id: string, @Body() createLectureDto: CreateLectureDto) {
    return this.lectureService.create(+id, createLectureDto);
  }
  @Get('/:id/lectures')
  getLectures(@Param('id') id: string) {
    return this.lectureService.getLectures(+id);
  }
}
