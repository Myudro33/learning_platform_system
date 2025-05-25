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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('')
@ApiTags('Assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}
  @UseGuards(JwtGuard, InstructorGuard)
  @Post('/courses/:id/assignments')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'create assignments' })
  @ApiResponse({ status: 201, description: 'assignment created' })
  create(@Param('id') id: string, @Body() dto: CreateAssignmentDto) {
    return this.assignmentService.createAssignment(+id, dto);
  }
  @Get('/courses/:id/assignments')
  @ApiOperation({ summary: 'get assignments' })
  @ApiResponse({ status: 200, description: 'assignments fetched' })
  getAssignments(@Param('id') id: string) {
    return this.assignmentService.getAssignments(+id);
  }
  @UseGuards(JwtGuard, StudentGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'submit assignment' })
  @ApiResponse({ status: 201, description: 'assignment submitted' })
  @Put('/assignments/:id/submit')
  submit(@Param('id') id: string) {
    return this.assignmentService.submit(+id);
  }
  @UseGuards(JwtGuard, InstructorGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get submissions' })
  @ApiResponse({ status: 200, description: 'get submitted assignments' })
  @Get('/assignments/:id/submissions')
  getSubmitedSubmissions(@Param('id') id: string) {
    return this.assignmentService.getSubmitedSubmissions(+id);
  }
}
