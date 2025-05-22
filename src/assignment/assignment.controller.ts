import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { JwtGuard } from 'src/auth/guard';
import { InstructorGuard } from 'src/auth/guard/instructor.guard';

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
}
