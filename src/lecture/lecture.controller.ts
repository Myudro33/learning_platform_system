import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { JwtGuard } from '../auth/guard';
import { InstructorGuard } from '../auth/guard/instructor.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('courses')
@ApiTags('Lectures')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}
  @UseGuards(JwtGuard, InstructorGuard)
  @Post('/:id/lectures')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'add lectures' })
  @ApiResponse({ status: 201, description: 'lecture created success' })
  create(@Param('id') id: string, @Body() createLectureDto: CreateLectureDto) {
    return this.lectureService.create(+id, createLectureDto);
  }
  @Get('/:id/lectures')
  @ApiOperation({ summary: 'get course lectures by course id' })
  @ApiResponse({ status: 200, description: 'course lectures fetched' })
  getLectures(@Param('id') id: string) {
    return this.lectureService.getLectures(+id);
  }
}
