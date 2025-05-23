import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { JwtGuard } from '../auth/guard';
import { InstructorGuard } from '../auth/guard/instructor.guard';
import { StudentGuard } from 'src/auth/guard/student.guard';

@Controller('')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}
  @UseGuards(JwtGuard, InstructorGuard)
  @Post('/courses/:id/assignments')
  create(@Param('id') id: string, @Body() dto: CreateAssignmentDto) {
    return this.assignmentService.createAssignment(+id, dto);
  }
  @Get('/courses/:id/assignments')
  getAssignments(@Param('id') id: string) {
    return this.assignmentService.getAssignments(+id);
  }
  @UseGuards(JwtGuard, StudentGuard)
  @Put('/assignments/:id/submit')
  submit(@Param('id') id: string) {
    return this.assignmentService.submit(+id);
  }
  @UseGuards(JwtGuard, InstructorGuard)
  @Get('/assignments/:id/submissions')
  getSubmitedSubmissions(@Param('id') id: string) {
    return this.assignmentService.getSubmitedSubmissions(+id);
  }
}
